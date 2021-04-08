import React, { Component } from "react";
import uuid from "uuid-v4";
export class AddProduct extends Component {
  state = {
    name: "",
    quantity: "",
    price: "",
    tax: "",
    amount: 0
  };

  calculateAmount = () => {
    let {
      price,
      quantity,
      tax,
    } = this.state

    quantity = quantity === "" ? 0 : parseFloat(quantity).toFixed(2);
    price = price === "" ? 0 : parseFloat(price).toFixed(2);
    tax = tax === "" ? 0 : parseFloat(tax).toFixed(2);

    let amount = price * quantity
    const taxAmount = amount * tax / 100

    amount += taxAmount
    amount = amount.toFixed(2)

    this.setState({ amount })
  }

  onChange = (text, id) => this.setState({ [id]: text }, this.calculateAmount)

  showSnackBar(msg) {
    var snackbarContainer = document.querySelector("#demo-toast-example");
    var data = { message: msg };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }
  onSubmit = event => {
    event.preventDefault();
    let name = this.state.name.trim();
    let quantity = this.state.quantity;
    let price = this.state.price;
    let tax = this.state.tax;
    let amount = this.state.amount;

    if (name === "") {
      this.showSnackBar("Please Enter Name");
      return;
    }
    if (quantity === "") {
      this.showSnackBar("Please Enter Quantity");
      return;
    }
    if (price === "") {
      this.showSnackBar("Please Enter Price");
      return;
    }
    if (tax === "") {
      tax = 0;
    }
    quantity = parseFloat(quantity).toFixed(2);
    price = parseFloat(price).toFixed(2);
    amount = parseFloat(amount).toFixed(2);
    const productId = uuid();
    const Product = { productId, name, quantity, price, tax, amount };
    this.props.addProduct(Product);
    this.setState({
      name: "",
      quantity: "",
      price: "",
      tax: "",
      amount: 0
    });
    this.props.closeModal();
  };
  render() {
    let amount = parseFloat(this.state.amount);
    return (
      <div>
        <center>
          <h4 style={{ margin: 0 }}>{amount.toFixed(2)} </h4>
          <form onSubmit={this.onSubmit}>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input myinput"
                type="text"
                placeholder="Product Name"
                value={this.state.name}
                onChange={e => this.onChange(e.target.value, e.target.id)}
                id="name"
              />
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input myinput"
                type="number"
                placeholder="Product Quantity"
                value={this.state.quantity}
                onChange={e => this.onChange(e.target.value, e.target.id)}
                id="quantity"
              />
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input myinput"
                type="number"
                placeholder="Product Price"
                value={this.state.price}
                onChange={e => this.onChange(e.target.value, e.target.id)}
                id="price"
              />
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input myinput"
                type="number"
                placeholder="Product Tax"
                value={this.state.tax}
                onChange={e => this.onChange(e.target.value, e.target.id)}
                id="tax"
              />
            </div>
            <br />
            <button
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            >
              Add
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default AddProduct;
