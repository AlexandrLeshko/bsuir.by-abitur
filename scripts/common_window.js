function openPopWin(winURL__, winWidth__, winHeight__, openIfAlreadyOpened__, moveX__, moveY__, winFeatures__)
{
	if(!top.popWins__) popWins__ = new Array();
		else popWins__ = top.popWins__;
	if(openIfAlreadyOpened__ == '')
		openIfAlreadyOpened__ = false;

	found_window_with_the_same_URL__ = false;
	i__ = 0;

	try
        {
          while(i__ < popWins__.length)
          {
                  if(popWins__[i__].closed)
                  {
                          popWins__.splice(i__,1);
                  }
                  else
                  {
                          if(popWins__[i__].href__.length == winURL__.length
                          && popWins__[i__].href__.toLowerCase().indexOf(winURL__.toLowerCase()) != -1)
                          {
                                  found_window_with_the_same_URL__ = true;
                                  break;
                          }
                          i__++;
                  }
          }
        }
        catch(e)
        {}

	if(!found_window_with_the_same_URL__ || openIfAlreadyOpened__)
	{
		sWidth__ = (winWidth__ != ''? ",width="+winWidth__: "");
		sHeight__ = (winHeight__ != ''? ",height="+winHeight__: "");
		popWin__ = window.open(winURL__, '_blank', winFeatures__ + sWidth__ + sHeight__);
		popWin__.href__ = winURL__;
		if (moveX__ != '' && moveY__ != '') popWin__.moveTo(moveX__,moveY__);
		popWins__.push(popWin__);
	}
	else
	{
		popWins__[i__].focus();
	}
	top.popWins__ = popWins__;
}

function openPopWinSimple(winURL, winWidth, winHeight, moveX, moveY, winFeatures)
{
		if (openPopWinSimple.arguments.length == 6)
			winFeatures = "," + winFeatures;
		else winFeatures = "";
		popWin = window.open(winURL, '_blank', "width=" + winWidth + ",height=" + winHeight + winFeatures);
		if (moveX != '' && moveY != '') popWin.moveTo(moveX,moveY);
}