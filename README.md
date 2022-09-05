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
	
	**headers:**
		x_api_key:
	
	**body:**
	"employeeId": (number)
	"type": (string)
		
	return
	returns the info of the card that was just inserted.
	
