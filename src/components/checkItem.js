import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, renderSeriesList, updateWish, getWishLength, getWishFromLocal } from './../slices/productsSlice';
import { addTocart, getCartLength, getCartTotal, pushToCart, removeCart, updateCart, getCartLocal, changeCartnum } from './../slices/cartSlice';
import {
  Link
} from "react-router-dom";

import './../pages/check_order/checkOrder.scss';

export default function CheckItem({ data }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const getCartInfo = () => {
    dispatch(getCartLocal());
    dispatch(getCartLength());
    dispatch(getCartTotal());
  }

  useEffect(() => {
    setQuantity(Number(data.qty));
  }, []);

  const changeAmount = (prod, qty) => {
    setQuantity(qty);
    getCartInfo();
    dispatch(changeCartnum({ product: prod, qty: Number(qty)}));
    getCartInfo();
  }

  const changeNum = (prod, qty) => {
    const amount = parseInt(Number(quantity) + (Number(qty)), 10);
    changeAmount(prod, amount);
  }

  return (
    <li className="pb-3 orderList" key={data.id}>
      <div className='row'>
          <div className='col-3 p-0'>
            <div className='pro-img'>
              <img src={data.imageUrl} alt={data.title} />
            </div>
          </div>
          <div className='col-6 p-0'>
              <div className='row'>
                  <div className='col-12 col-md-6'>
                      <div className='pro-name'>{data.title}</div>
                  </div>
                  <div className='col-12 col-md-6'>
                      <div className='numControl'>
                          <button type="button" className="btn-minus" onClick={() => changeNum(data, -1)}>
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          <input 
                            className="amount"
                            type="number"
                            value={quantity}
                            onChange={(e) => changeAmount(data, e.target.value)}
                            max="10" min='1' />
                          <button type="button" className="btn-plus" onClick={() => changeNum(data, 1)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          <div className='col-2 p-0'>
              <div className='pro_price'>NT {data.origin_price}</div>
          </div>
          <div className='col-1 p-0'>
            <div className="pro_del"><i className="fas fa-trash-alt"></i></div>
          </div>
      </div>
    </li>
  )
}