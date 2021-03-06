#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import os
import jinja2
import logging
import flask_socketio
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send, disconnect

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

connectionState = -1
interactionNumber = -1


@app.route('/')
def hello():
    template = JINJA_ENVIRONMENT.get_template('templates/index.html')
    return template.render()

@app.route('/interaction')
def interaction():
    template = JINJA_ENVIRONMENT.get_template('templates/interaction.html')
    return template.render()

@app.route('/autonomy')
def autonomy():
    template = JINJA_ENVIRONMENT.get_template('templates/autonomy.html')
    return template.render()

@app.route('/study')
def study():
    template = JINJA_ENVIRONMENT.get_template('templates/study.html')
    return template.render()

@app.route('/references')
def references():
    template = JINJA_ENVIRONMENT.get_template('templates/references.html')
    return template.render()

@app.route('/experimentScreen')
def experimentScreen():
    template = JINJA_ENVIRONMENT.get_template('templates/experimentScreen.html')
    return template.render()

@app.route('/experimentController')
def experimentController():
    template = JINJA_ENVIRONMENT.get_template('templates/experimentController.html')
    return template.render()
# app = webapp2.WSGIApplication([
# 	('/', MainHandler)
# ], debug=True)

@socketio.on('updateInteractionState')
def trigger_interaction_change(message):
    connectionState = message['data']['connectionState']
    interactionNumber = message['data']['interactionNumber']
    emit('changeInteraction', message, broadcast=True)

@socketio.on('connect')
def test_connect():
    print('Server connected')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on('trigger_replay')
def trigger_replay(message):
    emit('replayAudio', message, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
