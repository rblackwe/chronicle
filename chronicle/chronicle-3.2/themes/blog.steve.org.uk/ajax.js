// -*-mode: C++; style: K&R; c-basic-offset: 4 ; -*- */
//
//  Simple collection of Javascript for Ajax form submission.
//




//
//  Get an XMLHTTPRequest object.
//
function getXMLHTTPRequest()
{
    req = false;
    if(window.XMLHttpRequest) 
    {
        try 
        {
             req = new XMLHttpRequest();
        } 
        catch(e) 
        {
             req = false;
        }
    }
    else if(window.ActiveXObject)
    {
        try
        {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e) 
        {
            try 
            {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } 
            catch(e) 
            {
                req = false;
            }
        }
    }
 
    return( req );
}


//
//  Submit the comment.
//
function submitComment() 
{
    showProgress();

    var xhr = getXMLHTTPRequest();
    if(! xhr ) 
    {
        hideProgress();
        return;
    }

    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status  == 200)
            {
                var o = document.getElementById( "output" );
                o.innerHTML = xhr.responseText;
            }
            else
            {
                var o = document.getElementById( "output" );
                o.innerHTML = "Failed HTTP code " + xhr.status + " " +  xhr.responseText;
            }

            hideProgress();
        }
    };

    data = 'ajax=1';
    data = data + '&id=' + escape(document.forms[0].id.value );
    data = data + '&captcha=' + escape( document.forms[0].captcha.value );
    data = data + '&id=' + escape(document.forms[0].id.value );
    data = data + '&captcha=' + escape( document.forms[0].captcha.value );
    data = data + '&name=' + escape( document.forms[0].name.value );
    data = data + '&mail=' + escape( document.forms[0].mail.value );
    data = data + '&body=' + escape( document.forms[0].body.value );

    //
    //  Make the request
    //
    xhr.open("POST", "/cgi-bin/comments.cgi", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}


//
//  Show our progress marker.
//
function showProgress()
{
    var i = document.getElementById( "progress" );
    if ( i ) 
    {
        i.style.display = 'block';
    }
}

//
//  Hide our progress marker.
//
function hideProgress() 
{
    var i = document.getElementById( "progress" );
    if ( i ) 
    {
        i.style.display = 'none';
    }
}
