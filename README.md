# valex_db

  ## A database used for companies to generate benefit cards such as "transport", "health", "restaurants", "groceries" and "education" for their employees. 
	
	The database allows the employees to activate their cards through setting a new password, and also get its balance and block 
	or unblock their cards
	
	Also the companies are able to recharge their employees cards.
	
## 1. CREATE NEW CARD
	In order to create a new card for the active employee, the company needs to send their service key as a header and their 
	employeeId and also the type of the card.
	
	Type of card: the cards can be only of the "transport", "health", "restaurants", "groceries" or "education" types.
	
	path: http://localhost:4000/new-card
	
	headers:
	  x_api_key:
	
	body:
	  "employeeId": (number)
	  "type": (string)
		
	return
	  returns the info of the card that was just inserted.
	  
## 2.Activate Card

	In order for the employee activate their card, they need to send the security code and the new password in the body of the request, 
	and also the cardId.
		
	path: http://localhost:4000/activate-card
	
	body:
	cardId: (number),
	securityCode: (string),
	password: (string)
  		
	return
	returns code 204.

## 3.Show Balance

	Shows the balance of the card and all the recharges made by the company and transactions. The employee needs to provide de cardId only.
		
	path: http://localhost:4000/display/balance
	
	body:
	cardId: (number),
  		
	return
	returns the balance and all recharges and transactions.

## 3.Block/Unblock Card

	Allows the employee to block or unblock their card. Providing their cardId and password.
		
	path: http://localhost:4000/card/unblock
	path: http://localhost:4000/card/block
	
	body:
	cardId: (number),
	password: (string)
  		
	return
	returns the card info.

## 4.Recharge

	Allows companies to recharge their employees benefit card.
	
	path: http://localhost:4000/recharge
	
	body:
	cardId: (number),
	amount: (number)
  		
	return
	returns the recharge info.,

## 5.Payments

	Allows users to make payments using their cards.
	
	path: http://localhost:4000/purchase
	
	body:
	cardId: (number),
	password: (string),
	businessId: (number),
	amount: (number)
  		
	return
	returns the payment info.,
	
