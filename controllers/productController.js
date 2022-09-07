const fs = require('fs');

// Handlers
exports.getAllProducts = (req, res) => {
  const products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`, 'utf8'));
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: products.length,
    data: { products },
  });
};

exports.getProductoId = (req, res) => {
  const { id } = req.params;
  const products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`, 'utf8'));
  const product = products.find((item) => item.id === +id);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  res.status(200).json({
    status: 'success',
    data: { product },
  });
};

exports.adicionarNuevoProducto = (req, res) => {
  const products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`, 'utf8'));
  products.push(req.body);
  writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
};



exports.editarProducto = (req, res) => {
  const id_product = req.params.id;
  const body = req.body;
  const productsStr = fs.readFileSync(`${__dirname}/../data/products.json`, 'utf8');
  const products = JSON.parse(productsStr);
  const result_p = products.find((item) => item.id == id_product);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  result_p.name = body.name || result_p.name;
  result_p.price = body.price || result_p.price;    
  result_p.category = body.category || result_p.category;
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
  res.status(200).json({
    status: 'success',
    data: {
      result_p,
    }
  })
};
exports.eliminarProducto = (req, res) => {
  const id_product = req.params.id;
  const productsStr = fs.readFileSync(`${__dirname}/../data/products.json`, 'utf8');
  let products = JSON.parse(productsStr);
  const product = products.find((item) => item.id == id_product);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  products = products.filter((item) => item.id != id_product);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
  res.status(200).json({
    status: 'success',
    data: {
      product,
    }
  })
};



