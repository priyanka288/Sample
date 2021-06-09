import React,{useState,useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


function DataList(){
    
  const [userList, setUserList]=useState([]);

  const columns=[
      {dataField :'id',text:'Id',sort:true,filter :textFilter()},
      {dataField :'name',text:'Name',sort:true,filter :textFilter()},
      {dataField :'username',text:'Username',sort:true,filter :textFilter()},
      {dataField :'email',text:'Email',sort:true,filter :textFilter()}
  ]

  const pagination= paginationFactory({
      page:1,
      sizePerPage : 5,
      lastPageText:'>>',
      firstPageText:'<<',
      nextPageText:'>',
      prePageText:'<',
      showTotal:true,
      alwaysShowAllBtns:true,
      onPageChange :function(page,sizePerPage){
          console.log('page',page);
          console.log('sizePerPage',sizePerPage);
      },
      onSizePerPageChange:function(page,sizePerPage){
        console.log('page',page);
        console.log('sizePerPage',sizePerPage);
      }
  });


  const getData=()=>{
    fetch('http://jsonplaceholder.typicode.com/users',{
         headers : { 
           'Content-Type': 'application/json',
           'Accept': 'application/json'
          }
        }
       )
       .then(response => response.json())
       .then(result => setUserList(result))
       .catch(error => console.log(error));
     }
     useEffect(()=>{
       getData()
     },[])


//   useEffect(()=>{
//     fetch('http://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(result => setUserList(result))
//     .catch(error => console.log(error));
//   },[])
    return <div>
        <BootstrapTable 
        bootstrap4 
        keyField='id' 
        columns={columns} 
        data={userList}
        pagination={pagination}
        filter ={filterFactory()}
        />
        {/* <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>UserName</th>
                <th>Email</th>
            </tr>
            {
                userList && userList.length>0?
                userList.map(usr =>
                    <tr>
                        <td>{usr.id}</td>
                        <td>{usr.name}</td>
                        <td>{usr.username}</td>
                        <td>{usr.email}</td>
                    </tr>
                    )
                    :'Loading'
            }
        </table>
     */}
    </div>
}
export default DataList;