# Biblioteca Personală

### Introducere

* Principalul beneficiu adus de o bibliotecă virtuală este ușurința cu care poți accesa informația, oriunde te-ai afla, fără să depinzi de 
	un anumit program. Biblioteca personală ajută iubitorii de lectură să își organizeze cărțile în funcție de o categorie, să ajungă rapid la o anumită carte după un criteriu dorit 
	( autor, an, categorie) și să managerieze cititul setând ce cărți sunt în curs de citire sau ce cărți urmează să fie devorate.
	De asemenea, fiecare cititor va putea să aibă la îndemână cărțile care l-au impresionat într-o secțiune specifică, denumită "Favorites".
* Biblioteca personală se adresează tuturor tipurilor de utilizatori, în special celor pasionați de citit și dornici să își organizeze această 
	activitate.
* My library - Google, Bookster, libib.

### Interfata aplicatie

![alt text](https://github.com/ionutmitu20/bibliotecaPersonala/blob/master/docs/Capture.PNG)

### API 

* Exemplu request

```
    GET/BOOKS
```

* Exemplu response
* 
```
    [
     {
        "category":"SF"
        "title": "Star Trek"
        "author":"James Blish"
        "nr pages":"500"
     }
    ]
```
* Componente
  

    Categories list
    Books list
    Books search
    Reading list
    To read list
    Favorites list


* API calls

```
    GET/CATEGORIES
    GET/CATEGORIES/:ID/BOOKS    
    PUT/FAVORITE/:ID
    PUT/TOREAD/:ID
    GET/BOOKS/?SEARCH=
    PUT/BOOKS/:ID/READING
```

* Actiunile utilizatorului

```
    1. View books in a category
    2. Search book by name
    3. Add book in To Read list or in Favorites
    4. View Reading books
```



