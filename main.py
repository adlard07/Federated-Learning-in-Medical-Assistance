from flask import Flask, render_template, request
from model_agregation.agregate import Predict
from tensorflow.keras.models import load_model
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

brain_tumor = load_model(r'models/brain_tumor.h5')
brain_tumor_classes = ['Glioma Tumor', 'Meningioma Tumor', 'Pituitary Tumor']

breast_cancer = load_model(r'models/breast_cancer.h5')
breast_cancer_classes = ['Benign', 'Malignant', 'Normal']

fracture = load_model(r'models/fracture_detection.h5')
fracture_classes = ['Fractured', 'Not Fractured']

kidney = load_model(r'models/kidney.h5')
kidney_classes = ['Cyst', 'Tumor', 'Stone', 'Normal']

pneumonia = load_model(r'models/pneumonia_detection.h5')
pneumonia_classes = ['PNEUMONIA', 'NORMAL']


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return render_template('index.html', error='No file part')

    file = request.files['file']

    if file.filename == '':
        return render_template('index.html', error='No selected file')

    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        dropdown = request.form['dropdown']
        
        if dropdown=='Brain Tumor':
            model = brain_tumor
            classes = brain_tumor_classes
        elif dropdown=='Breast Cancer':
            model = breast_cancer
            classes = breast_cancer_classes
        elif dropdown=='Fracture':
            model = fracture
            classes = fracture_classes
        elif dropdown=='Kidney Disease':
            model = kidney
            classes = kidney_classes
        elif dropdown=='Pneumonia Disease':
            model = pneumonia
            classes = pneumonia_classes
        
        predictor = Predict()
        result = predictor.make_prediction(model, classes, file_path)
        return render_template('index.html', success=f'The Resultant Class is: {result}')


if __name__ == '__main__':
    app.run(debug=True)