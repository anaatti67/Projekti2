// Jos searchId > 0 niin, etsii id:n perusteella, muuten palauttaa kaikki.
const getProduct = function(id, callback) {
let searchStr = "";
if (searchId > 0) {
searchStr = 'select * from Products WHERE id=' + connection.escape(id);
} else if (searchId == 0) {
  searchStr = 'select * from Products';
}
connection.query(searchStr, (err, products) => {
  if(err) {
    throw err;
  }
      products.forEach((product) => callback(`\nproduct name: ${product.Name} \nproduct price: ${product.Price}\n`));
  })
}

export default getProduct;