import time
import threading
from flask import Flask, render_template, url_for, request, jsonify
from flask_wtf import FlaskForm
import random
app = Flask(__name__)
app.config['SECRET_KEY'] = 'd6e006ae56c73f81c8a14bbe6759751e'

stop_sign = threading.Event()

class earth:
    def __init__(self):
        # Populatisiooni arvutamiseks kasutan hetkel pop_capi ja pop_growth
        # pop_growth arvutan labi toidu ja pop_capi, peaks muutma
        self.population = 1000
        self.population_cap = 50000
        self.population_growth = 0.006
        self.food = 0
        self.discovered_worlds = ["Africa"]
        # Erinevad kontinendid kujul {<kontinent>: [<vajaminev pop>, {"food": <palju toitu lisandub>, "pop_cap": <palju lisandub>}]}
        self.world = {'Africa': [0, {'food': 1000, 'population_cap': 1000000}], 'Europe': [10000, {'food': 500, 'population_cap': 2000000}], 'Asia': [50000, {'food': 500, 'population_cap': 2000000}], 'Oceania': [100000, {'food': 500, 'population_cap': 2000000}], 'North-America': [1000000, {'food': 500, 'population_cap': 2000000}], 'South-America': 1500000, 'North Pole': 20000000, 'Antarctica': 100000000}
        self.continents = ['Africa', 'Europe', 'Asia', 'Oceania', 'North-America', 'South-America', 'North Pole', 'Antarctica']
        self.year = 0
        # loogika jarjepidamiseks. veits sloppy
        self.discover_next = 'Europe'
        self.next_milestone = 10000
        # mangu ticki arvutamine
        self.next_tick = time.monotonic() + 1
    
    def game_tick(self):
        # iga 0.5 sek toimub 
        intervals = 0.5
        when = time.monotonic()
        while self.population < self.population_cap and not stop_sign.is_set():
            self.next_tick += 1
            # pop = pop + growth*pop*(1-pop/cap) also lisan 0.5 ja roundin, et vaga vaikeste arvude korral oleks ka juurdekasv
            self.population += round(self.population_growth*self.population*(1-self.population/self.population_cap)+0.5,0)
            self.food = max(0, self.food - self.population*0.0005)
            when += intervals
            time.sleep(max(0, when - time.monotonic()))

    def calculating_population_growth(self):
        self.population_growth = self.food/1000 * self.population_cap/90000

    def discover_new_worlds(self):
        self.discovered_worlds.append(self.discover_next)
        self.food += self.world[self.discover_next][1]['food']
        self.population_cap += self.world[self.discover_next][1]['population_cap']
        self.discover_next = self.continents[self.continents.index(self.discover_next)+1]
        self.next_milestone = self.world[self.discover_next][0]

    def game_input(self):
        user_input = input("Press something\n")
        print('You pressed', user_input)
    
    def simulate(self):  
        when = time.monotonic()
        intervals = 2
        while not stop_sign.is_set():
            if self.population >= self.next_milestone:
                self.discover_new_worlds()
            self.year += 1
            when += intervals
            time.sleep(max(0, when-time.monotonic()))

Earth = earth()

threads = []
# motlesin, et teeb threadidega, siis on on leht rohkem responsive
thread_population = threading.Thread(target=Earth.game_tick, daemon=True)
#thread_user_input = threading.Thread(target=Earth.game_input, daemon=True)
thread_simulation = threading.Thread(target=Earth.simulate, daemon=True)
threads.extend([thread_population, thread_simulation])

@app.route("/", methods=['GET'])
def home_page():
    return render_template("home.html")

@app.route("/game_data", methods=["POST", "GET"])
def game_data():
    data = [
        {"info": "population", "value": Earth.population},
        {"info": "population_cap", "value": Earth.population_cap},
        {"info": "food", "value": Earth.food}
    ]
    return jsonify(data)

@app.route("/start_game", methods=["GET", "POST"])
def start_game():
    for t in threads:
        t.start()
    return "", 204

@app.route("/gather_food", methods=["GET", "POST"])
def gather_food():
    Earth.food += 50
    a = random.randint(0, int(Earth.population/10))
    Earth.population -= a
    Earth.calculating_population_growth()
    return "", 204

if __name__ == "__main__":
    try:
        app.run(
            port = 5000,
            debug=True

        )
    finally:
        stop_sign.set()
        for t in threads:
            t.join()