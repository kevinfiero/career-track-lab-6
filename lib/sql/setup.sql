DROP TABLE IF EXISTS filaments;

CREATE TABLE filaments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    filament_name TEXT NOT NULL,
    brand TEXT NOT NULL,
    type TEXT NOT NULL,
    melting_point INTEGER NOT NULL,
    yearly_sales INTEGER NOT NULL
);