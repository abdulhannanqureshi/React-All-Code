import React, { Component } from 'react';

class Fetching extends Component {
    constructor(props){
        super(props);

        this.state = {
            paroduct: []
        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1/reactapi/prod.php')
        .then( productData => productData.json() )
        .then( response => {

            this.setState({
                paroduct: response
            })

            },(error) => {
                console.log(error);
            }

        )
    }


    render(){
      return(

          <div className="tableSection">
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>#ID</th>
                    <th>product_name</th>
                    <th>sku</th>
                    <th>price</th>
                    <th>Images</th>
                    <th>Action tes</th>
                  </tr>
                </thead>
                <tbody>

                {
                    this.state.paroduct.map( (item, index) =>  (
                        <tr key={item.id}>
                            <td>{ index + 1 }</td>
                           <td>{item.id}</td> 
                           <td>{item.product_name}</td> 
                           <td>{item.sku}</td> 
                           <td>{item.price}</td> 
                           <td><img src={item.Images} alt="Item" /></td> 
                           <td><button className="btn btn-success">Edit</button> <button className="btn btn-danger">Delete</button></td> 
                        </tr>
                    ))
                }

                </tbody>
              </table>
            </div>
          </div>
        );
    }
}

export default Fetching;
