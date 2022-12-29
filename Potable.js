import React, { useEffect, useState } from 'react';
import { Trash, PlusCircle } from 'react-bootstrap-icons';
import { _checkCurrency, _checkDecimal, _getUniqueId, _formatnumberkeyup, _checkumber, _insertingfs  } from '../Utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Potable = ({heading, action, column, setRow, row, load}) => {
    const [tableId, setTableId] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [loading, setLoading] = useState(load);

    useEffect( () => {
        setTableId(_getUniqueId());
    },[])


    useEffect( () => {
        setLoading(load);
    },[load])

    //send data to parent
    const theadStyle = {
        background : "#3a3a3a",
        color : "#fff"
    }

    const tbodyStyle = {
        
    }

    const loadingStyle = {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        height: "100%",
        width: "100%",
        opacity: "0.5",
        top: "0",
        background : "#fff",
        display: "flex",
        alignItems: "center",
        bottom: "0",
        zIndex: 2
    }

    const childStyle = {
        zIndex: 3,
        opacity: 1,
        color: "black",
        margin: "auto",
        marginTop: "120px",
        fontSize: "20px"
      }



    const handleChange = (index, field, e) => {
        let nRow = [...row];
        let currentRow = nRow[index];
        currentRow[field] = e.target.value;
        setRow(nRow);
    }


    const showLoading = () => {
        return (
                <div style={loadingStyle}>
                    <div style={childStyle}>
                        loading
                    </div>
                </div>      
        );
        
    }

    const getInputType = (indexRow, indexColumn, value = "") => {
        const currentColumn = column[indexColumn];
        const currentRow = row[indexRow];     

        const type = currentColumn["type"];
        const data = currentColumn["data"];
        const field = currentColumn["field"];
        value = value == "" ? currentColumn["defaultValue"] : value;

        switch (type) {
            case "text":
                return <input 
                    type="text" 
                    className='form-control' 
                    autoComplete='off' 
                    onChange={(e)=>handleChange(indexRow, field, e)} 
                    onKeyUp={(e)=>handleChange(indexRow, field, e)} 
                    value = {value}
                    name={field}/> 

            case 'option':
                return <select
                    className='form-control'
                    name={field}
                    defaultValue={value}
                    onChange={(e)=>handleChange(indexRow, field, e)} 
                >
                    <option key={-1} value="">-</option>
                  {
                    data.map((item, i) => {                        
                        return <option key={i} value={item.value}>{item.name}</option>
                    })
                  }
                </select>;                    
            case "date":
               return <DatePicker
                    selected={startDate}
                    onChange={(date,e)=>{setStartDate(date);handleChange(indexRow, field, e)}}
                    value = {value}
                />;
            case "number":
                return <input 
                    type="text" 
                    className='form-control' 
                    autoComplete='off' 
                    onKeyDown={(e) => { _checkumber(e) }}
                    onChange={(e)=>handleChange(indexRow, field, e)} 
                    onKeyUp={(e)=>handleChange(indexRow, field, e)} 
                    value = {value}
                    name={field}/> 
            
            case "decimal":
                return <input 
                    type="text" 
                    className='form-control' 
                    autoComplete='off' 
                    onKeyDown={(e) => { _checkDecimal(e) }}
                    onKeyUp={(e)=>handleChange(indexRow, field, e)} 
                    onChange={(e)=>handleChange(indexRow, field, e)} 
                    value = {value}
                    name={field}/> 

            case "textarea":
                return <textarea 
                        type="text" 
                        className='form-control' 
                        autoComplete='off' 
                        onChange={(e)=>handleChange(indexRow, field, e)} 
                        value = {value}
                        name={field}/> 

            case "currency":
                return <input 
                    type="text" 
                    className='form-control' 
                    autoComplete='off' 
                    onKeyDown={(e)=>{_checkCurrency(e)}}
                    onChange={(e)=>handleChange(indexRow, field, e)} 
                    value = {value}
                    name={field}/> ;

            default:
                return <input 
                    type="text" 
                    className='form-control'
                    autoComplete='off' 
                    onChange={(e)=>handleChange(indexRow, field, e)}  
                    value = {value}
                    name={field}/> ;
        }
    }

    const addRow = () => {
        let newRow = [...row];
        let inputRow = {};
        
        for(var k in column) {
            const field = typeof (column[k]['field']) != "undefined" ? column[k]['field'] : '';
            const defaultValue = typeof(column[k]['defaultValue']) != "undefined" ? defaultValue : "";
            inputRow[field] = defaultValue;
        }

        newRow.push(inputRow);
        setRow(newRow)
    }

    const removeRow = (index) => {
        let newRow = [...row];
        newRow.splice(index, 1);        
        setRow(newRow);
    }

    const renderBody = () => {
        var htm = [];
        
        row.map((item, index)=>{    
            const inputRow = [];
            const cItem = Object.keys(item);

            for(var k=0;k<cItem.length;k++){
                const val = item[cItem[k]];
                inputRow.push(<td key={`${k}-${index}`}>{getInputType(index, k, val)}</td>)
            }

            if(action === null){
                inputRow.push(<td key={`action-${index}`} className='text-center'><button type='button' className='btn btn-sm btn-danger' onClick={()=>{removeRow(index)}}><Trash/></button></td>);
            }
            htm.push(<tr key={index}>{inputRow}</tr>);       
        })

        return htm;
    }

    const renderHeader = () => {
        let n = []
        for(var k in column) {            
            n.push( <th key={k}>{column[k]['name']}</th> )
        }
      
        n.push(<th key="action" width="5%">Aksi</th>)
        if (typeof column == 'undefined') {
            return (<tr><td>Tidak ada column</td></tr>)
        }

        return (<tr>{n}</tr>)
    }


    if(typeof column == "undefined") {
        return (<div className='text-center'>Tidak ada kolumn</div>);
    }
    else{
            return (
                <div className='position-relative'>
                    <h3 className='d-inline-block mt-3' >{heading}</h3>
                    <div className="text-zero top-right-button-container mb-2 mt-2">
                        <button className="top-right-button btn btn-sm btn-success" type='button' onClick={addRow}><PlusCircle/></button>
                    </div>
                    <table id={tableId} style={{minHeight:"120px"}} className='dataTable table table-hover table-bordered'>
                        <thead style={theadStyle}>
                            { renderHeader() }
                        </thead>
                        <tbody style={tbodyStyle} id={`tbody-${tableId}`}>
                            { renderBody() }
                        </tbody>
                    </table>
                    { loading ? showLoading() : ''}
                 </div>
            )
        }
    
}

Potable.defaultProps = {
    heading : "",
    action : null,
    getData : null,
    column : [],
}


export default Potable
//column default
    // const column = [
    //     {
    //         name : "Jurusan",
    //         field : "name",
    //         defaultValue : "",
    //         type : "option",
    //         data : [
    //             {
    //                 name : "oke",
    //                 value : "1"
    //             },
    //             {
    //                 name : "oke2",
    //                 value : "2"
    //             },
    //         ]
    //     },
        //     {
    //         name : "Kode",
    //         field : "code",
    //         defaultValue : "",
    //         type : "text"
    //     },
    //     {
    //         name : "Kode",
    //         field : "code",
    //         defaultValue : "",
    //         type : "date"
    //     },
    //     {
    //         name : "Fakultas",
    //         field : "faculty",
    //         defaultValue : "",
    //         type : "number"
    //     },
    //     {
    //         name : "Passing Grade",
    //         field : "passing_grade",
    //         defaultValue : "",
    //         type : "currency"
    //     },
    // ]