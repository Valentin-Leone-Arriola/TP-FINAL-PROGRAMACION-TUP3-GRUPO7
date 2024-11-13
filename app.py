from website import create_app
from website import db
from flask import send_file
app = create_app()


@app.route('/index.js')
def index_js() -> None:
    return send_file('./static/js/index.js')

@app.route('/identificacion.js')
def identificacion_js() -> None:
    return send_file('./static/js/identificacion.js')

@app.route('/register.js')
def register_js() -> None:
    return send_file('./static/js/register.js')

@app.route('/summary-table.js')
def summary_table() -> None:
    return send_file('./static/js/summary-table.js')

with app.app_context():
    db.create_all()
if __name__ == '__main__':
    app.run(debug=True)
    
    