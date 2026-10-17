#%pip install flask
from flask import Flask, render_template, url_for, request, jsonify
from flask_wtf import FlaskForm
from trips_traps_trull import TRIPSTRAPSTRULL
app = Flask(__name__)
app.config['SECRET_KEY'] = 'd6e006ae56c73f81c8a14bbe6759751e'

class dict:
    def __init__(self, a):
        self.tmp = [
            {"ind":1,
                "label":None},
            {"ind":2,
            "label":None},
            {"ind":3,
                "label":None},
            {"ind":4,
            "label":None},
            {"ind":5,
                "label":None},
            {"ind":6,
            "label":None},
            {"ind":7,
                "label":None},
            {"ind":8,
            "label":None},
            {"ind":9,
            "label":None}
        ]
        self.a = a
        for i in range(1,10):
            self.tmp[i-1]["label"]=self.a[i]
game = TRIPSTRAPSTRULL()
@app.route("/", methods=["POST", "GET"])
def home_page():
    game.tee_tühi_väljak()
    tmp = dict(game.näita_väljakut())
    return render_template("field.html", field=tmp.tmp)

@app.route("/move", methods=["POST"])
def move():
    data = request.get_json()
    cell_index = int(data["cell_index"])
    a = game.kas_vaba(cell_index)
    game.käi_lahtrisse(cell_index)
    player,_ = game.kes_mis_märgiga_mängib()
    game.n += 1
    b, winner_winner_chicken_dinner = game.kas_keegi_võitis()
    return jsonify(message='1' if a else '0', player=player, won='1' if b else '0', winner='X' if winner_winner_chicken_dinner == 2 else 'O')