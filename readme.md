# Aplikacja do organizacji pracy freelancerskiej.

## Opis

Aplikacja umożliwia przechowywanie, organizację oraz śledzenie postępu tworzonych projektów freelancerskich. Posiada funkcję inteligentnego wyliczania opłat za przepracowane godziny. Pozwala zapanować nad chaosem pracy twórczej dzięki funkcjonalności timera pozwalającej w czasie rzeczywistym kontrolować czas spędzony nad projektem. Aplikacja przeznaczona dla jednej osoby, umożliwiajaca rejestrację, logowanie i utrzymywanie sesji aktualnie zalogowanego klienta. Dzięki wykorzystaniu RWD dopasowuje się do każdego urządzenia.

#### Narzędzie do komunikacji - Microsoft Teams.

## Funkcjonalności

##### RWD 
(Julia)
- dopasowanie widoku strony do trzech rozdzielczości
  - mobilnej
  - desktopowej

##### Rejestracja użytkownika

- backend (Arkadiusz i Mikołaj)
  - endpoint rest POST
  - query mongoDB z zapisaniem użytkownika
  - sprawdzenie czy dany email/login jest zajęty
  - obsługa błędów

- front (Julia)
  - walidacja danych
  - przygotowanie widoku
  - podpięcie serwisu (Mikołaj)
  - obsługa błędów
  - routing

##### Logowanie użytkownika

- backend (Arkadiusz i Mikołaj)

  - endpoint rest POST
  - query mongoDB z sprawdzeniem czy użytkownik istnieje
  - obsługa błędów
  - zapisywanie sesji

- front (Julia)
  - walidacja danych
  - przygotowanie widoku
  - podpięcie serwisu (Mikołaj)
  - obsługa błędów
  - routing

##### Timer

- front (Julia)

  - wysyłanie zapytania post w momencie zakończenia wyliczania (Mikołaj)
  - przygotowanie widoku
  - dodanie routingu

- backend (Arkadiusz i Mikołaj)
  - zapis wpisu (entry jak w przypadku dodania entry z palca)

##### Inteligentne liczenie zapłaty za przepracowane godziny

- backend (Arkadiusz i Mikołaj)
  - zapytanie do bazy mongo i wyliczenie przepracowanych godzin \* stawka zapisana w bazie

##### Śledzenie projektu

- backend (Arkadiusz i Mikołaj)

  - wystawienie restowego GET /project/{id}
  - wystawienie restowego GET dla wszystkich projektów /project
  - obsługa dodawania projektu POST /project
  - obsługa usuwania projektu DELETE /project/{id}
  - obsługa zmiany danych w projekcie put /project/{id}
  - dane z bazy danych mongoDB

- front (Julia)
  - przygotowanie widoku dla jednego projektu
  - przygotowanie widoku dla listy projektów
  - obsługa widoku braku projektów
  - widok nowego projektu
  - widok edycji projektu
  - modal obsługujący usuwanie projektu
  - podpięcie serwisów (Mikołaj)
  - routing

##### Dodawanie wpisów (entries)

- backend (Arkadiusz i Mikołaj)

  - obsługa dodawania wpisu POST /entry/{id}
  - obsługa usuwania projektu DELETE /entry/{id}
  - obsługa zmiany danych w projekcie put /entry/{id}
  - dane z bazy danych mongoDB

- front (Julia)

  - widok dodawania wpisu
  - zapytanie GET po wszystkie projekty (dropdown menu) /project
  - walidacja wprowadzonych danych
  - spięcie z serwisem (Mikołaj)
  - routing

##### Ustawienia

- backend (Arkadiusz i Mikołaj)

  - obsługa edycji użytkownika PUT user
  - obsługa usunięcia użytkownika DELETE user
  - dane z bazy danych mongoDB

- front (Julia)

  - widok danych użytkownika
  - spięcie z serwisem (Mikołaj)
  - button usunięcia użytkownika
  - routing

## Harmonogram prac

- 21/11/2021 - finalizacja modeli danych w aplikacji + przygotowanie widoków HTMLowych 

- 01/12/2021 - konfiguracja połączenia backendu z bazą dancych 

- 01/12/2021 - przygotowanie interfesju użytkownika

- 01/01/2022 - RWD + logowanie/rejestracja i dodawanie entries

- 30/01/2022 - wstępny plan zakończenia prac

## Technologie

- Backend - .NET CORE
- Frontend - Angular
- Baza - MongoDB

## Makiety interfejsu

![New project](https://github.com/Aldill/freelancerNotebook/blob/main/New%20project%20screen.png "New project")
![Welcome 1](https://github.com/Aldill/freelancerNotebook/blob/main/Welcome%20screen%20%E2%80%93%201.png "Welcome 1")
![Welcome](https://github.com/Aldill/freelancerNotebook/blob/main/Welcome%20screen.png "Welcome")
![Log in - mobile](https://github.com/Aldill/freelancerNotebook/blob/main/Mobile%20log%20in%20screen.png "Log in - mobile")
![Logged in - mobile](https://github.com/Aldill/freelancerNotebook/blob/main/Mobile%20logged%20in%20menu%20screen.png "Logged in - mobile")
![Welcome - mobile](https://github.com/Aldill/freelancerNotebook/blob/main/Mobile%20welcome%20screen.png "Welcome - mobile")

## Skład zespołu

- Mikołaj Sobiegraj - lider, odpowiedzialny za backend i frontend,
- Julia Olszewska - opdpowiedzialna za frontend,
- Arkadiusz Wójs - odpowiedzialny za backend.
