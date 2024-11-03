-- Création des tables
CREATE TABLE directors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE actors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT,
    director_id INT,
    rating DECIMAL(3, 1),
    FOREIGN KEY (director_id) REFERENCES directors(id)
);

CREATE TABLE movie_actors (
    movie_id INT,
    actor_id INT,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (actor_id) REFERENCES actors(id),
    PRIMARY KEY (movie_id, actor_id)
);

-- Insertion des directeurs
INSERT INTO directors (name) VALUES 
('Christopher Nolan'),
('Frank Darabont'),
('Francis Ford Coppola'),
('Quentin Tarantino'),
('David Fincher'),
('Robert Zemeckis'),
('Lana Wachowski, Lilly Wachowski'),
('Ridley Scott'),
('Steven Spielberg'),
('Jonathan Demme'),
('Irvin Kershner'),
('Peter Jackson'),
('Sergio Leone'),
('Bryan Singer'),
('Martin Scorsese'),
('Damien Chazelle'),
('Bong Joon Ho'),
('Roman Polanski'),
('Roger Allers, Rob Minkoff'),
('Olivier Nakache, Éric Toledano'),
('Robert Zemeckis'),
('Stanley Kubrick'),
('Andrew Stanton'),
('Jean-Pierre Jeunet'),
('Ron Howard'),
('Hayao Miyazaki'),
('Fernando Meirelles, Kátia Lund'),
('James Cameron'),
('Tony Kaye'),
('Mel Gibson');

-- Insertion des acteurs
INSERT INTO actors (name) VALUES 
('Leonardo DiCaprio'),
('Joseph Gordon-Levitt'),
('Elliot Page'),
('Tom Hardy'),
('Tim Robbins'),
('Morgan Freeman'),
('Bob Gunton'),
('William Sadler'),
('Marlon Brando'),
('Al Pacino'),
('James Caan'),
('Robert Duvall'),
('Christian Bale'),
('Heath Ledger'),
('Aaron Eckhart'),
('Michael Caine'),
('John Travolta'),
('Uma Thurman'),
('Samuel L. Jackson'),
('Bruce Willis'),
('Brad Pitt'),
('Edward Norton'),
('Helena Bonham Carter'),
('Meat Loaf'),
('Tom Hanks'),
('Robin Wright'),
('Gary Sinise'),
('Mykelti Williamson'),
('Keanu Reeves'),
('Laurence Fishburne'),
('Carrie-Anne Moss'),
('Hugo Weaving'),
('Matthew McConaughey'),
('Anne Hathaway'),
('Jessica Chastain'),
('Russell Crowe'),
('Joaquin Phoenix'),
('Connie Nielsen'),
('Oliver Reed'),
('Matt Damon'),
('Tom Sizemore'),
('Edward Burns'),
('Liam Neeson'),
('Ben Kingsley'),
('Ralph Fiennes'),
('Caroline Goodall'),
('Jodie Foster'),
('Anthony Hopkins'),
('Lawrence A. Bonney'),
('Kasi Lemmons'),
('Michael Clarke Duncan'),
('David Morse'),
('Bonnie Hunt'),
('Mark Hamill'),
('Harrison Ford'),
('Carrie Fisher'),
('Billy Dee Williams'),
('Elijah Wood'),
('Viggo Mortensen'),
('Ian McKellen'),
('Orlando Bloom'),
('Clint Eastwood'),
('Eli Wallach'),
('Lee Van Cleef'),
('Aldo Giuffrè'),
('Morgan Freeman'),
('Kevin Spacey'),
('Gwyneth Paltrow'),
('Kevin Pollak'),
('Scarlett Johansson'),
('Hugh Jackman'),
('Miles Teller'),
('J.K. Simmons'),
('Paul Reiser'),
('Melissa Benoist'),
('Adrien Brody'),
('Thomas Kretschmann'),
('Frank Finlay'),
('Maureen Lipman'),
('Jamie Foxx'),
('Christoph Waltz'),
('Kerry Washington'),
('James Earl Jones'),
('Whoopi Goldberg'),
('François Cluzet'),
('Omar Sy'),
('Anne Le Ny'),
('Audrey Fleurot'),
('Michael J. Fox'),
('Christopher Lloyd'),
('Lea Thompson'),
('Crispin Glover'),
('Arnold Schwarzenegger'),
('Linda Hamilton'),
('Edward Furlong'),
('Sigourney Weaver'),
('Tom Skerritt'),
('John Hurt'),
('Veronica Cartwright'),
('Guy Pearce'),
('Joe Pantoliano'),
('Mark Boone Junior'),
('Mel Gibson'),
('Sophie Marceau'),
('Patrick McGoohan'),
('Jack Nicholson'),
('Shelley Duvall'),
('Danny Lloyd'),
('Ben Burtt'),
('Elissa Knight'),
('Jeff Garlin'),
('Fred Willard'),
('Audrey Tautou'),
('Mathieu Kassovitz'),
('Rufus'),
('Lorella Cravotta');

-- Insertion des films
INSERT INTO movies (title, year, director_id, rating) VALUES 
('Inception', 2010, (SELECT id FROM directors WHERE name='Christopher Nolan'), 8.8),
('The Shawshank Redemption', 1994, (SELECT id FROM directors WHERE name='Frank Darabont'), 9.3),
('The Godfather', 1972, (SELECT id FROM directors WHERE name='Francis Ford Coppola'), 9.2),
('The Dark Knight', 2008, (SELECT id FROM directors WHERE name='Christopher Nolan'), 9.0),
('Pulp Fiction', 1994, (SELECT id FROM directors WHERE name='Quentin Tarantino'), 8.9),
('Fight Club', 1999, (SELECT id FROM directors WHERE name='David Fincher'), 8.8),
('Forrest Gump', 1994, (SELECT id FROM directors WHERE name='Robert Zemeckis'), 8.8),
('The Matrix', 1999, (SELECT id FROM directors WHERE name='Lana Wachowski, Lilly Wachowski'), 8.7),
('Interstellar', 2014, (SELECT id FROM directors WHERE name='Christopher Nolan'), 8.6),
('Gladiator', 2000, (SELECT id FROM directors WHERE name='Ridley Scott'), 8.5),
('The Godfather', 1972, (SELECT id FROM directors WHERE name='Francis Ford Coppola'), 9.2),
('The Dark Knight', 2008, (SELECT id FROM directors WHERE name='Christopher Nolan'), 9.0),
('Pulp Fiction', 1994, (SELECT id FROM directors WHERE name='Quentin Tarantino'), 8.9),
('Fight Club', 1999, (SELECT id FROM directors WHERE name='David Fincher'), 8.8),
('Forrest Gump', 1994, (SELECT id FROM directors WHERE name='Robert Zemeckis'), 8.8),
('The Matrix', 1999, (SELECT id FROM directors WHERE name='Lana Wachowski, Lilly Wachowski'), 8.7),
('Interstellar', 2014, (SELECT id FROM directors WHERE name='Christopher Nolan'), 8.6),
('Gladiator', 2000, (SELECT id FROM directors WHERE name='Ridley Scott'), 8.5),
('Saving Private Ryan', 1998, (SELECT id FROM directors WHERE name='Steven Spielberg'), 8.6),
('Schindler''s List', 1993, (SELECT id FROM directors WHERE name='Steven Spielberg'), 8.9);

-- Insertion des relations films-acteurs

-- Inception
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'Inception'), (SELECT id FROM actors WHERE name = 'Leonardo DiCaprio')),
((SELECT id FROM movies WHERE title = 'Inception'), (SELECT id FROM actors WHERE name = 'Joseph Gordon-Levitt')),
((SELECT id FROM movies WHERE title = 'Inception'), (SELECT id FROM actors WHERE name = 'Elliot Page')),
((SELECT id FROM movies WHERE title = 'Inception'), (SELECT id FROM actors WHERE name = 'Tom Hardy'));

-- The Shawshank Redemption
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'The Shawshank Redemption'), (SELECT id FROM actors WHERE name = 'Tim Robbins')),
((SELECT id FROM movies WHERE title = 'The Shawshank Redemption'), (SELECT id FROM actors WHERE name = 'Morgan Freeman'));

-- The Godfather
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'The Godfather'), (SELECT id FROM actors WHERE name = 'Marlon Brando')),
((SELECT id FROM movies WHERE title = 'The Godfather'), (SELECT id FROM actors WHERE name = 'Al Pacino')),
((SELECT id FROM movies WHERE title = 'The Godfather'), (SELECT id FROM actors WHERE name = 'James Caan')),
((SELECT id FROM movies WHERE title = 'The Godfather'), (SELECT id FROM actors WHERE name = 'Robert Duvall'));

-- The Dark Knight
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'The Dark Knight'), (SELECT id FROM actors WHERE name = 'Christian Bale')),
((SELECT id FROM movies WHERE title = 'The Dark Knight'), (SELECT id FROM actors WHERE name = 'Heath Ledger')),
((SELECT id FROM movies WHERE title = 'The Dark Knight'), (SELECT id FROM actors WHERE name = 'Aaron Eckhart')),
((SELECT id FROM movies WHERE title = 'The Dark Knight'), (SELECT id FROM actors WHERE name = 'Michael Caine'));

-- Pulp Fiction
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'Pulp Fiction'), (SELECT id FROM actors WHERE name = 'John Travolta')),
((SELECT id FROM movies WHERE title = 'Pulp Fiction'), (SELECT id FROM actors WHERE name = 'Uma Thurman')),
((SELECT id FROM movies WHERE title = 'Pulp Fiction'), (SELECT id FROM actors WHERE name = 'Samuel L. Jackson')),
((SELECT id FROM movies WHERE title = 'Pulp Fiction'), (SELECT id FROM actors WHERE name = 'Bruce Willis'));

-- Fight Club
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'Fight Club'), (SELECT id FROM actors WHERE name = 'Brad Pitt')),
((SELECT id FROM movies WHERE title = 'Fight Club'), (SELECT id FROM actors WHERE name = 'Edward Norton')),
((SELECT id FROM movies WHERE title = 'Fight Club'), (SELECT id FROM actors WHERE name = 'Helena Bonham Carter')),
((SELECT id FROM movies WHERE title = 'Fight Club'), (SELECT id FROM actors WHERE name = 'Meat Loaf'));

-- Forrest Gump
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'Forrest Gump'), (SELECT id FROM actors WHERE name = 'Tom Hanks')),
((SELECT id FROM movies WHERE title = 'Forrest Gump'), (SELECT id FROM actors WHERE name = 'Robin Wright')),
((SELECT id FROM movies WHERE title = 'Forrest Gump'), (SELECT id FROM actors WHERE name = 'Gary Sinise')),
((SELECT id FROM movies WHERE title = 'Forrest Gump'), (SELECT id FROM actors WHERE name = 'Mykelti Williamson'));

-- The Matrix
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'The Matrix'), (SELECT id FROM actors WHERE name = 'Keanu Reeves')),
((SELECT id FROM movies WHERE title = 'The Matrix'), (SELECT id FROM actors WHERE name = 'Laurence Fishburne')),
((SELECT id FROM movies WHERE title = 'The Matrix'), (SELECT id FROM actors WHERE name = 'Carrie-Anne Moss')),
((SELECT id FROM movies WHERE title = 'The Matrix'), (SELECT id FROM actors WHERE name = 'Hugo Weaving'));

-- Interstellar
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'Interstellar'), (SELECT id FROM actors WHERE name = 'Matthew McConaughey')),
((SELECT id FROM movies WHERE title = 'Interstellar'), (SELECT id FROM actors WHERE name = 'Anne Hathaway')),
((SELECT id FROM movies WHERE title = 'Interstellar'), (SELECT id FROM actors WHERE name = 'Jessica Chastain'));

-- Gladiator
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'Gladiator'), (SELECT id FROM actors WHERE name = 'Russell Crowe')),
((SELECT id FROM movies WHERE title = 'Gladiator'), (SELECT id FROM actors WHERE name = 'Joaquin Phoenix')),
((SELECT id FROM movies WHERE title = 'Gladiator'), (SELECT id FROM actors WHERE name = 'Connie Nielsen'));

-- Saving Private Ryan
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'Saving Private Ryan'), (SELECT id FROM actors WHERE name = 'Tom Hanks')),
((SELECT id FROM movies WHERE title = 'Saving Private Ryan'), (SELECT id FROM actors WHERE name = 'Matt Damon')),
((SELECT id FROM movies WHERE title = 'Saving Private Ryan'), (SELECT id FROM actors WHERE name = 'Edward Burns'));

-- Schindler's List
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
((SELECT id FROM movies WHERE title = 'Schindler''s List'), (SELECT id FROM actors WHERE name = 'Liam Neeson')),
((SELECT id FROM movies WHERE title = 'Schindler''s List'), (SELECT id FROM actors WHERE name = 'Ben Kingsley')),
((SELECT id FROM movies WHERE title = 'Schindler''s List'), (SELECT id FROM actors WHERE name = 'Ralph Fiennes'));

