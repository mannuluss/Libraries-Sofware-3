echo "Build catalog"
cd frontend-catalog
npm run build
echo "Build reviews"
cd ../frontend-reviews
npm run build
echo "Build store"
cd ../frontend-store
npm run build
echo "Copiando archivos..."
sudo cp -r frontend-catalog/dist/* /var/www/html/frontend-catalog/
sudo cp -r frontend-reviews/dist/* /var/www/html/frontend-reviews/
sudo cp -r frontend-store/dist/* /var/www/html/frontend-store/