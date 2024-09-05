from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from supabase.client import ClientOptions

# Get the absolute path of the current Python file
current_dir = os.path.dirname(os.path.abspath(__file__))

# Change the working directory to the current file's directory
os.chdir(current_dir)

# Load environment variables from .env file
load_dotenv(dotenv_path='supabase.env')

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

@app.route('/bill')
def bill():
    return render_template('bill.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/inventory')
def inventory():
    return render_template('inventory.html')

@app.route('/Profile')
def profilee():
    return render_template('Profile.html')

@app.route('/')
def landing():
    return render_template('landing_page.html')

@app.route('/purchase-order')
def purchase():
    return render_template('purchase-order.html')

@app.route('/sales-report')
def sales():
    return render_template('sales-report.html')

@app.route('/distributor')
def distributor():
    return render_template('distributor.html')



if __name__ == '__main__':
    app.run(debug=True, port=3000)