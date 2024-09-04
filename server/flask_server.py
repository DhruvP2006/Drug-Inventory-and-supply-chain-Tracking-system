from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from supabase.client import ClientOptions

# Load environment variables from .env file
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key,
    options=ClientOptions(
        postgrest_client_timeout=10,
        storage_client_timeout=10,
        schema="public",
    ))

app = Flask(__name__, static_folder='../static', template_folder='../template')

@app.route('/add-item', methods=['POST'])
def add_item():
    data = request.json
    print(data) #{'itemName': 'Crocin', 'itemCode': '12345', 'hsnSacCode': '990872', 'purchasePrice': '20', 'mrp': '30', 'currentStock': '200'}
    response = supabase.table('inventory').insert(data).execute()

    if response.error:
        return jsonify({"error": response.error.message}), 400
    return jsonify({"message": "Item added successfully!"}), 200

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/inventory')
def about():
    return render_template('inventory.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)