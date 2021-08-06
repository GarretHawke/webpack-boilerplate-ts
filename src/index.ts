import './styles/main.scss';

const root = document.getElementById('root');

const mainImage = document.createElement('img');

mainImage.src = './img/inquisition.jpg';
mainImage.style.width = '90%';

root?.append(mainImage);
