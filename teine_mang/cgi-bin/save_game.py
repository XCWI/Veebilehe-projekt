#!/usr/bin/env python3

import cgi
import json
import os
from datetime import datetime

# Set the content type to JSON
print("Content-Type: application/json")
print()

# Get the form data
form = cgi.FieldStorage()

# Get the game data from the form
try:
    game_data = json.loads(form.getvalue("gameData"))
    
    # Validate required fields
    required_fields = ["resources", "upgrades"]
    for field in required_fields:
        if field not in game_data:
            print(json.dumps({"success": False, "error": f"Missing required field: {field}"}))
            exit(1)
    
    # Create the saves directory if it doesn't exist
    saves_dir = "saves"
    if not os.path.exists(saves_dir):
        os.makedirs(saves_dir)
    
    # Generate a filename with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = os.path.join(saves_dir, f"save_{timestamp}.json")
    
    # Save the game data
    with open(filename, "w") as f:
        json.dump(game_data, f, indent=2)
    
    # Return success response
    print(json.dumps({
        "success": True,
        "message": "Game saved successfully",
        "savePath": filename
    }))
    
except Exception as e:
    # Return error response
    print(json.dumps({
        "success": False,
        "error": str(e)
    }))