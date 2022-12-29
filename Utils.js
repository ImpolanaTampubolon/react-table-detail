
import { Spinner } from "reactstrap";
  


  export const _getUniqueId = () => {
      let t = new Date();
      const uniqueId = t.getTime() + "" + _getRandomInt(3);
      return uniqueId;
  }

  
export const _getKeyEvent = (e) => {
	var keynum;
	if (window.event) 
		keynum = e.keyCode;
	else if(e.which) 
		keynum = e.which;
	return keynum;
}

  export const _checkumber = (e) =>{
    var kn = _getKeyEvent(e);

    if ((kn > 47 && kn < 58) || kn == 8 || kn == 9 || kn == 37 || kn == 38 || kn == 39 || kn == 40 || kn == 44 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40  || e.keyCode == 44  || kn == 46 || e.keyCode == 46){
      return true;
    }
    else{
      e.preventDefault();
      return false; 
    }
  }

  export const _checkDecimal = (e) => {
    var kn = _getKeyEvent(e);
    var n = separatorDecimal == "," ? 188 : 190;
    
    if (
        ((kn > 47 && kn < 58)  || kn == 8 || kn == 9 || kn == 37 || kn == 38 || kn == 39 || kn == 40 || kn == 44 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40  || e.keyCode == 44  || kn == 46 || e.keyCode == 46)
        || (kn == n)
      ) {
      return true;
    }
    else{
      e.preventDefault();
      return false; 
    }
  }

  export const _checkCurrency = (e) => {
      if(_checkumber(e)) {
        _insertingfs(e);
      }
  }

  export const _insertingfs = (e) => {
    if (_isNumeric(e.target.value)){
      var price = _replacestr(e.target.value,",","");
      e.target.value = _formatnumberkeyup(price);
    }
  }

  export const _isNumeric = (strString) =>{
    var strValidChars = "0123456789.,-";
    var strChar;
    var blnResult = true;
  
    if (strString.length == 0)
      return false;
  
    for (var i = 0; i < strString.length && blnResult == true; i++){
      strChar = strString.charAt(i);
      if (strValidChars.indexOf(strChar) == -1){
        blnResult = false;
      }
    }
    return blnResult;
  }

  export const _singleLoading = () => {
    return (
      <div className='text-center'>
          <Spinner className="text-center" color="primary"/>
      </div>
    )
  }

  export const _directPageAfterSave = (history, url) => {
      setTimeout(()=>{
        history.push(url);
      },delayRedirect)
  }

  export const _replacestr = (str,find,replacement) => {
    while (str.indexOf(find) != -1){
      str = str.replace(find,replacement);	
    }
    return str;
  }
  
  export const _formatPotable = (row) => {
      let sendData = [];
      row.map((itemList) => {
          let singleItem = {};
          itemList.map((item)=>{
              let field = item.field
              let value = item.value
              singleItem[field] = value;
          });
          sendData.push(singleItem);
      });

      return sendData;
  }


  export const _mapColumn = (data, column) => {
    const columnName = column.map(item=>item.field);     

    const result = data.map((item)=>{     
      var r = {};
      for(var k in columnName) {
          const field = columnName[k];
          r[field] = item[field];
      } 
      return r
    }); 


    return result;
  }

  export const _formatnumberkeyup = (prices) =>{
    var separator = separatorNumber;
    var decseparator = separatorDecimal;
    
    var price = ''+prices;
    var decimalpoint = price.indexOf(".");
    var decimals = '';
    if (decimalpoint != -1){
      decimals = decseparator+price.substr(decimalpoint+1);
      price = price.substr(0,decimalpoint);
    }
    if (price.length > 3) {
      var mod = price.length % 3;
      var output = (mod > 0 ? price.substr(0,mod) : '');
      for (var i=0 ; i < Math.floor(price.length / 3); i++) {
        if ((mod == 0) && (i == 0))
          output += price.substr(mod + 3 * i, 3);
        else
          output += separator+price.substr(mod + 3 * i, 3);
      }
      return output+decimals;
    }
    else{
      return price+decimals;
    }
  }
