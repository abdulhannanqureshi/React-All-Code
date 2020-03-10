import React, { Component } from 'react';

class AddData extends Component {
    constructor(props){
        super(props);

        this.state = {
            paroduct: [],
            productName: '',
            sku: '',
            price: '',
            imgUrl: '',
            argu: ''
        }
    }
    // For Fetching S
    componentDidMount(){
        fetch('http://127.0.0.1/reactapi/prod.php')
        .then( productData => productData.json() )
        .then( response => {

            this.setState({
                paroduct: response
            })
            //console.log(response);
            },(error) => {
                console.log(error);
            }

        )
    }
    // For Fetching E



    // For Add S
    addProduct = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    addImage = (e) => {
        //console.log(e.target.files[0]);
        let files = e.target.files;

        let reader = new FileReader();

        reader.readAsDataURL(files[0]);

        reader.onload=(e) => {
          this.setState({
            imgUrl: e.target.result
          })
        }
    }


    submitProduct = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1/reactapi/product.php',{
            method: 'POST',
            header: new Headers({
                // 'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'multipart/form-data'
            }),
            body: JSON.stringify({
                "product_name": this.state.productName,
                "sku": this.state.sku,
                "price": this.state.price,
                "Images": this.state.imgUrl
            })

        })
        .then((response) => response.text())
      .then((responseTextIn) => {            
          window.location.reload();
        })
        .catch((error) => {
            alert(error);
        });
    }
    // For Add E

    // For Delete S
    deletProduct = (id) => {
        fetch('http://127.0.0.1/reactapi/deleteapi.php?id='+id ,{
            method:'POST',
            header: new Headers({
                'Content-Type' : 'application/x-www-form-urlencoded'
            })
        })
        .then((response) => response.text())
        .then((responseDelet) => {
            let dlt = JSON.parse(responseDelet);
          if(dlt.success==='true'){
            window.location.reload();
          }
          if(dlt.success==='faild'){
            alert('delete failed');
          }
        
      })
    }
    // For Delete E


    // For Edit S

    getValue = (id) => {
        let getUrl = `http://127.0.0.1/reactapi/editprod.php?id=${id}`;
        console.log(getUrl);
        fetch(getUrl)
        .then( res => res.json() )
        .then( (result) => {
            this.setState({
                productName: result[0].product_name,
                sku: result[0].sku,
                price: result[0].price,
                argu: id
            })
        },
        (error) => {
            alert(error);
        })
    }

    updateProduct = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1/reactapi/editapi.php?id=${this.state.argu}`,{
            method: 'POST',
            header: new Headers({
                'Content-Type':'multipart/form-data'
            }),
            body: JSON.stringify({
                "product_name": this.state.productName,
                "sku": this.state.sku,
                "price": this.state.price,
                "Images": this.state.imgUrl
            })
        })
        .then((response) => response.text())
          .then((responseText) => {

            let object = JSON.parse(responseText);
            if(object.success==='true'){
              window.location.reload();
            }
            if(object.success==='faild'){
              alert('update failed');
            }
            
          })
    }

    // For Edit E


    render(){
            console.log(this.state.imgUrl); 
      return(
          <div className="tableSection">
            <form onSubmit={this.submitProduct}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="productName" placeholder="Product Name" onChange={this.addProduct} />
                </div>

                <div className="form-group">
                    <label>Sku</label>
                    <input type="text" name="sku" placeholder="Sku" onChange={this.addProduct} />
                </div> 

                <div className="form-group">
                    <label>Price</label>
                    <input type="text" name="price" placeholder="Price"  onChange={this.addProduct} />
                </div> 

                <div className="form-group">
                    <label>Upload Image</label>
                    <input type="file" name="imgUrl"  onChange={this.addImage} />
                </div>  

                <div className="form-group">
                    <button type="submit">Add</button>  
                </div> 
            </form>



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
                    <th>Action</th>
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
                           <td>
                                <button className="btn btn-success" data-toggle="modal" data-target="#empModal" onClick={() => this.getValue(item.id)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => this.deletProduct(item.id)}>Delete</button>
                            </td> 
                        </tr>
                    ))
                }

                </tbody>
              </table>
            </div>

            <div className="modal fade" id="empModal">
                <div className="modal-dialog">
                
                    <div className="modal-content">
                    
            <form onSubmit={this.updateProduct}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="productName" placeholder="Product Name" value={this.state.productName} onChange={this.addProduct} />
                </div>

                <div className="form-group">
                    <label>Sku</label>
                    <input type="text" name="sku" placeholder="Sku" onChange={this.addProduct} value={this.state.sku} />
                </div> 

                <div className="form-group">
                    <label>Price</label>
                    <input type="text" name="price" placeholder="Price"  onChange={this.addProduct} value={this.state.price} />
                </div> 

                <div className="form-group">
                    <label>Upload Image</label>
                    <input type="file" name="imgUrl"  onChange={this.addImage} />
                </div>  

                <div className="form-group">
                    <button type="submit">Submit</button>  
                </div> 
            </form>

                    </div>
                  
                </div>
            </div>

          </div>
        );
    }
}

export default AddData;
