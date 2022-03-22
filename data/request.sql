CREATE TABLE heroes (

	name VARCHAR(50),
	power VARCHAR[10],
	color VARCHAR(50),
	isAlive BOOLEAN NOT NULL,
	age INTEGER,
	image VARCHAR(1000)
);

SELECT * FROM heroes

INSERT INTO heroes (name, power, color, isAlive, age, image)
VALUES(
        'Iron Man',
        ARRAY ['money'],
        'red',
        false,
        46,
        'https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart'
    ),
    (
        'Thor',
        ARRAY ['electrivity', 'worthy'],
        'blue',
        true,
        300,
        'https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg'
    ),
    (
        'Daredevil',
        ARRAY ['Blind'],
        'red',
        false,
        30,
        'https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg'
    );

SELECT * FROM heroes