-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatype in your design, you will have to change these here.


CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "userName" varchar(20) NOT NULL,
    "userEmail" varchar(20) NOT NULL,
    "userPassword" text NOT NULL,
	"userRole" varchar(20) NOT NULL, 
    CONSTRAINT "pk_user" PRIMARY KEY ( "id" ),
    CONSTRAINT "uc_user_userEmail" UNIQUE ( "userEmail" )
	CONSTRAINT "chk_userRole" CHECK ("userRole" IN ('Admin', 'Employee'))
);

CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "name" varchar(20) NOT NULL,
    "floor" int NOT NULL,
    "capacity" int NOT NULL,
    CONSTRAINT "pk_rooms" PRIMARY KEY ( "id" )
);

CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "userId" int NOT NULL,
    "roomId" int NOT NULL,
    "bookingStart" timestamp NOT NULL,
    "bookingEnd" timestamp NOT NULL,
    "purpose" varchar(200) NOT NULL,
    CONSTRAINT "pk_bookings" PRIMARY KEY ( "id" )
);

ALTER TABLE "bookings" ADD CONSTRAINT "fk_bookings_userId" FOREIGN KEY("userId")
REFERENCES "user" ("id");

ALTER TABLE "bookings" ADD CONSTRAINT "fk_bookings_roomId" FOREIGN KEY("roomId")
REFERENCES "rooms" ("id");
