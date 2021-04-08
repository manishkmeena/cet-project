import React from "react";
import Payment from "../payment";
const FourthRow = props => {
  return (
    <div className="secondbox">
      <Payment {...props} />
      {/* <button
        onClick={() => props.makeInvoice(props.total)}
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        style={{ margin: 10 }}
      >
        Invoice
      </button> */}
    </div>
  );
};
export default FourthRow;
