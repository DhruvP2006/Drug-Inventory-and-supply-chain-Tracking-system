from flask import Flask, render_template

app = Flask(__name__, static_folder='../static', template_folder='../template')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/inven')
def about():
    return render_template('inventory.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)