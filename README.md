### devops-es6

## 1. Przygotowanie
1. Sprawdz, czy masz zainstalowany Node.js na komputerze. Aby to zrobic, uzyj w konsoli/terminalu komendy:

    > node -v

    Jezeli zobaczysz blad lub "node: command not found", zainstaluj Node.js w wersji LTS ze strony https://nodejs.org/en/
2. Sprawdz czy masz zainstalowane Visual Studio Code. Jezeli nie, zainstaluj VSC ze strony https://code.visualstudio.com/
3. Sprawdz czy masz zainstalowanego gulpa globalnie (na komputerze). Aby to zrobic, uzyj w konsoli/terminalu komendy:

    > gulp -v

    Jezeli zobaczysz blad lub "gulp: command not found", zainstaluj gulpa uzywajac w konsoli/terminalu komendy:

    > npm install -g gulp-cli

4. Sciagnij ten projekt jako ZIP i wypakuj lub sklonuj repozytorium za pomocą GITa.
5. Otworz Visual Studio Code i otworz w nim folder z projektem. Pamietaj, zbey otworzyc dobry folder. Przy rozpakowywaniu ZIP tworzy sie folder o nazwie "devops-sass-master", a w nim kolejny folder o nazwie "devops-sass-master". My musimy otworzyc ten drugi.
6. Jezeli jestes w dobrym meijscu i masz juz wszystko zainstalowane poprawnie, mozesz w konsoli/terminalu uruchomic komende:

    > npm install

    Zainstaluje ona wszystkie wymagane narzedzia.
7. Jezeli wszysytko sie poprawnie zainstalowalo, uruchom serwer developerski. Aby to zorbic, uzyj w konsoli/terminalu komendy:

    > gulp

    Powinna ci sie otworzyc strona w przegladarce. Odswiez ja za pierwszym razem, pozniej juz nie bedzie potrzeby odswiezac.
    Jezeli nie otworzyla sie strona, przejdz do przegladarki i otworz strone http://localhost:3000
    W razie problemów z odswiezaniem, zatrzymaj serwer developerski i uruchom go ponownie. Aby zatrzymac serwer, przejdz do konsoli/terminala, i uzyj skrotu CTRL+C/CMD+C, a na pytanie o zamkniecie odpowiedz T/Y. 

## Zrób jeden z podanych projektów korzystając z HTML, ES6 i SASS

# 1. ToDo - dodawanie, lista oraz usuwanie todo
# 2. Sekcja komentarzy - wyswietlanie, dodawanie i usuwanie komentarzy
# 3. Lista postów - wyswietlanie, dodawanie i usuwanie postów
# 4. Zarządzanie użytkownikami - dodawanie, usuwanie i edytowanie użytkowników
# 5. Chat - dodawanie i wyświetlanie wiadomości


1. Przejrzyj obecne pliki JS w folderze src/js
2. Dodaj w HTML odpowiednie pola, przyciski i wygląd
3. Dodaj w JS całą logikę używająć ES6, nowe elementy należy tworzyć jako moduły i klasy (patrz src/js/todo.js)
4. Ostyluj swoją aplikację używająć SASS + BEM
5. Stwórz PR do tego repozytorium. W nazwie PR podaj napisa "devops" oraz swoje imie i nazwisko. Przykład "devops_dawid_kozak"


## Materiały
- Strona z nowościami z ES6 - http://es6-features.org/#Constants
- Mój opis nowości - https://rwbit.pl/nowosci-w-es6/
- Oficjalna strona Babela - https://babeljs.io/
- Darmowe API do nauki - https://jsonplaceholder.typicode.com/