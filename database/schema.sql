set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."restaurants" (
	"userId" serial NOT NULL,
	"restaurantName" TEXT NOT NULL,
	"restaurantId" text NOT NULL,
	CONSTRAINT "restaurants_pk" PRIMARY KEY ("restaurantId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."meals" (
	"mealName" TEXT NOT NULL,
	"restaurantId" text NOT NULL,
	"mealId" serial NOT NULL,
  "servingSize" INTEGER NOT NULL,
  "calories" INTEGER NOT NULL,
  "protein" INTEGER NOT NULL,
  "fat" INTEGER NOT NULL,
  "carbohydrates" INTEGER NOT NULL,
  "restaurantName" text NOT NULL,
	CONSTRAINT "meals_pk" PRIMARY KEY ("mealId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "meals" ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("restaurantId");
