import React, { Component } from "react";
import "./home.css";
import ProductRow from "./ProductRow";
import FirstRow from "./FirstRow";
import SecondRow from "./SecondRow";
import Modal from "../Modal";
import AddProduct from "./AddProduct";
import ThirdRow from "./ThirdRow";
import FourthRow from "./FourthRow";
import { withAlert } from "react-alert";
import { calculateTotalPrice, clearAllProducts, getLocalProducts, getLocalStorageKey } from "../../utils";

export class Home extends Component {
  state = {
    isModalOpen: false,
    products: getLocalProducts(),
    shopName: getLocalStorageKey("shopName"),
    invoiceNumber: getLocalStorageKey("invoiceNumber"),
    personName: getLocalStorageKey("personName"),
    personDetail: getLocalStorageKey("personDetail"),
    GSTNumber: getLocalStorageKey("GSTNumber"),
  };

  render() {
    let total = 0;
    const { 
      shopName,
      products,
      invoiceNumber,
      personName,
      GSTNumber,
    } = this.state

    if (products.length !== 0) {
      total = calculateTotalPrice(products)
    }

    return (
      <div>
        <FirstRow
          changeUserInput={this.changeUserInput}
          shopName={shopName}
          invoiceNumber={invoiceNumber}
        />
        <SecondRow
          changeUserInput={this.changeUserInput}
          personName={personName}
          personDetail={this.state.personDetail}
        />
        <ThirdRow
          clearAll={this.clearAll}
          GSTNumber={GSTNumber}
          changeUserInput={this.changeUserInput}
          total={total}
        />
        <table
          className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp"
          style={{ width: "100%", paddingTop: 20 }}
          id="myprint"
        >
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">
                Product Name
              </th>
              <th style={{ textAlign: "left" }}>Quantity</th>
              <th style={{ textAlign: "left" }}>Unit price</th>
              <th style={{ textAlign: "left" }}>TAX</th>
              <th style={{ textAlign: "left" }}>Amount</th>
              <th style={{ textAlign: "center" }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
              return (
                <ProductRow
                  key={i}
                  product={product}
                  removeProduct={this.removeProduct}
                />
              );
            })}
          </tbody>
        </table>

        <FourthRow total={total} shopName={shopName} validate={this.validate} />

        <button
          onClick={() => this.openModal()}
          className=" useraddbutton mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
        >
          <i className="material-icons">add</i>
        </button>
        <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}
        >
          <i
            onClick={() => this.closeModal()}
            style={{ fontSize: 30, textAlign: "right", color: "red" }}
            className="material-icons"
          >
            clear
          </i>
          <AddProduct
            addProduct={this.addProduct}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );
  }

  validate = () => {
    const shopName = this.state.shopName.trim();
    const personName = this.state.personName.trim();
    const invoiceNumber = this.state.invoiceNumber.trim();
    const products = this.state.products;

    let message = ''

    if (shopName === "") message = "Enter Shop Name"
    if (personName === "") message = "Enter Customer Name"
    if (invoiceNumber === "") message = "Enter Invoice Number"
    if (products.length === 0)message = "Enter Some Products"

    if (message) {
      this.props.alert.show("Enter Invoice Number", {
        timeout: 2000,
        type: "INFO"
      })
      return false
    }

    return true
  }

  addProduct = product => {
    const products = this.state.products;
    products.push(product);
    this.setState({ products }, () => {
      localStorage.setItem("myProducts", JSON.stringify(products));
    });
  };

  removeProduct = id => {
    const products = this.state.products;
    const localproducts = JSON.parse(localStorage.getItem("myProducts"));
    const removedProducts = products.filter(product => {
      return product.productId !== id;
    });
    const localRemovedProducts = localproducts.filter(product => {
      return product.productId !== id;
    });
    localStorage.setItem("myProducts", JSON.stringify(localRemovedProducts));
    this.setState({ products: removedProducts });
  };

  clearAll = () => {
    clearAllProducts()
    this.setState({ products: [] });
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  changeUserInput = (text, state) => {
    localStorage.setItem(state, text)
    this.setState({ [state]: text });
  };
}

export default withAlert(Home);

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0,0.5)"
  }
};
