create schema reelratings;
use reelratings;
create table user
	(userID	int unsigned,
	username	varchar(10),
	email	varchar(20),
	password	varchar(20),
	followers	int unsigned,
	following	int unsigned,
	primary key (userID)
	);
create table follows
	(user1ID 	int unsigned,
	user2ID 	int unsigned,
	primary key (user1ID, user2ID),
	foreign key (user1ID) references user(userID)
		on delete cascade
		on update cascade,
	foreign key(user2ID) references user (userID)
		on delete cascade
		on update cascade
	);
create table movie
	(movieID	int unsigned,
	name	varchar(100),
	genre	varchar(50),
	primary key (movieID)
	);
create table adds
	(userID	int unsigned,
	movieID	int unsigned,
	primary key (userID, movieID),
	foreign key (userID) references user(userID)
		on delete cascade
		on update cascade,
	foreign key (movieID) references movie(movieID)
		on delete cascade
		on update cascade
	);
create table review
	(userID	int unsigned,
	movieID	int unsigned,
	reviewID	int unsigned,
	rating	numeric(2,1),
	description	varchar(500),
	likes	int unsigned,
	primary key (userID, movieID, reviewID),
	foreign key (userID) references user(userID)
		on delete cascade
		on update cascade,
	foreign key (movieID) references movie(movieID)
		on delete cascade
		on update cascade
	);
create table comment
	(userID	int unsigned,
	commentID	int unsigned,
	parentID	int unsigned,
	isReply	boolean,
	description	varchar(500),
	likes	int unsigned,
	primary key (userID, commentID),
	foreign key (userID) references user(userID)
		on delete cascade
		on update cascade
);

delimiter //

create trigger set_parent
	before insert on comment for each row
begin
	if new.isReply = true then
		if new.parentID not in (select reviewID from review) then
			signal sqlstate '45000'
            set message_text = 'No reviewID matches this parentID';
		end if;
	else
		if new.parentID not in (select commentID from comment) then
			signal sqlstate '45000'
            set message_text = 'No commentID matches this parentID';
		end if;
	end if;
end//

delimiter ;