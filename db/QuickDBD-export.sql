-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatype in your design, you will have to change these here.

CREATE TABLE "user" (
    "id" serial4 NOT NULL,
    "userName" varchar(20) NOT NULL,
    "userEmail" varchar(20) NOT NULL,
    "userPassword" text NOT NULL,
	"userRole" varchar(20) NOT NULL, 
    CONSTRAINT "pk_user" PRIMARY KEY ( "id" ),
    CONSTRAINT "uc_user_userEmail" UNIQUE ( "userEmail" )
	CONSTRAINT "chk_userRole" CHECK ("userRole" IN ('Admin', 'Employee'))
);

CREATE TABLE "room" (
    "id" serial4 NOT NULL,
    "name" varchar(20) NOT NULL,
    "floor" int4 NOT NULL,
    "capacity" int4 NOT NULL,
    CONSTRAINT "pk_rooms" PRIMARY KEY ( "id" )
);

CREATE TABLE "bookings" (
    "id" serial4 NOT NULL,
    "userId" int4 NOT NULL,
    "roomId" int4 NOT NULL,
    "bookingStart" timestamp NOT NULL,
    "bookingEnd" timestamp NOT NULL,
    "purpose" varchar(200) NOT NULL,
    CONSTRAINT "pk_bookings" PRIMARY KEY ( "id" ),
	CONSTRAINT "fk_booking_roomid" FOREIGN KEY ("roomId") REFERENCES "room"("id"),
	CONSTRAINT "fk_booking_userid" FOREIGN KEY ("userId") REFERENCES "user"("id")
);

CREATE TABLE "wishList" (
	"id" serial4 NOT NULL,
	"userId" int4 NOT NULL,
	"roomId" int4 NOT NULL,
	CONSTRAINT "pk_wishlist" PRIMARY KEY ("id"),
	CONSTRAINT "wishlist_un" UNIQUE ("userId", "roomId"),
	CONSTRAINT "fk_wishlist_roomid" FOREIGN KEY ("roomId") REFERENCES "room"("id"),
	CONSTRAINT "fk_wishlist_userid" FOREIGN KEY ("userId") REFERENCES "user"("id")
);

CREATE TABLE "notification" (
	"id" serial4 NOT NULL,
	"wishListId" int4 NOT NULL,
	"createdAt" timestamp NULL DEFAULT CURRENT_DATE,
	"detail" varchar NULL,
	CONSTRAINT "pk_notification" PRIMARY KEY ("id"),
	CONSTRAINT "fk_notification_wishlist" FOREIGN KEY ("wishListId") REFERENCES "wishList"("id")
);
