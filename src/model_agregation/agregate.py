from tensorflow.keras.models import load_model
import numpy as np
import cv2



class Predict:
    def __init__(self):
        self.brain_tumor = load_model(r'models/brain_tumor.h5')
        self.brain_tumor_classes = ['Glioma Tumor', 'Meningioma Tumor', 'Pituitary Tumor']

        self.breast_cancer = load_model(r'models/breast_cancer.h5')
        self.breast_cancer_classes = ['Benign', 'Malignant', 'Normal']

        self.fracture = load_model(r'models/fracture_detection.h5')
        self.fracture_classes = ['Fractured', 'Not Fractured']

        self.kidney = load_model(r'models/kidney.h5')
        self.kidney_classes = ['Cyst', 'Tumor', 'Stone', 'Normal']

        self.pneumonia = load_model(r'models/pneumonia_detection.h5')
        self.pneumonia_classes = ['PNEUMONIA', 'NORMAL']
        
        
    def preprocess_image(self, image_path):
        image = np.mean(cv2.imread(image_path)) // 255
        image = cv2.resize(image, (255, 255))
        image = image.reshape(1, 255, 255, 1)
        return np.array(image)

    def make_prediction(self, model, classes, image_path):
        img = Predict().preprocess_image(image_path)
        pred = model.predict(img)
        predicted_class_index = int(max(pred[-1]))
        predicted_class = classes[predicted_class_index]
        return predicted_class


if __name__=='__main__':
    predictor = Predict()
    model = predictor.pneumonia
    image_path = r'artifacts\test\pneumonia_2.jpeg'
    classes = predictor.pneumonia_classes

    result = predictor.make_prediction(model, classes, image_path)
    print("Predicted class:", result)    