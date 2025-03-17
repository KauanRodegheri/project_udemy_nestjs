start:
	docker build -t udemy_curse:u_c .
	docker run -d -p 3000:3000 --name udemy_curse_cursering udemy_curse:u_c
