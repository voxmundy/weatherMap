import React, { Component } from 'react';
import { isTemplateElement } from "@babel/types";

const NewSingle = ({item}) => (
    <div className="col s4">
        <div className="card">
            <div className="card-content">
                <i className={"owf owf-5x owf-fw owf-"+item.current.weather.number}></i>
                <p>{item.current.weather.value}</p>
                <p>{item.current.city.name}</p>
            </div>
            <div className="card-action">
                <a href="" target="_blank">Full Article</a>
            </div>
        </div>
    </div>
);
export default NewSingle;
