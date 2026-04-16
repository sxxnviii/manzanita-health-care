from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit-contact', methods=['POST'])
def submit_contact():
    return jsonify({'status': 'success', 'message': 'Thank you! We will be in touch within 24 hours.'})

@app.route('/submit-schedule', methods=['POST'])
def submit_schedule():
    return jsonify({'status': 'success', 'message': 'Appointment request received!'})

@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    return jsonify({'status': 'success', 'message': 'Thank you for your feedback!'})

@app.route('/submit-forum', methods=['POST'])
def submit_forum():
    return jsonify({'status': 'success', 'message': 'Your question has been posted!'})

if __name__ == '__main__':
    app.run(debug=True)
