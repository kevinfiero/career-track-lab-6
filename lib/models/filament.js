const pool = require('../utils/pool');

module.exports = class Filament {
    id;
    filamentName;
    brand;
    type;
    meltingPoint;
    yearlySales;

    constructor(row){
      this.id = row.id;
      this.filamentName = row.filament_name;
      this.brand = row.brand;
      this.type = row.type;
      this.meltingPoint = row.melting_point;
      this.yearlySales = row.yearly_sales;
    }

    //CRUD Methods

    static async insert({ filamentName, brand, type, meltingPoint, yearlySales }) {
      const { rows } = await pool.query(
        'INSERT INTO FILAMENTS (filament_name, brand, type, melting_point, yearly_sales) VALUES ($1, $2, $3, $4) RETURNING *',
        [filamentName, brand, type, meltingPoint, yearlySales]
      );

      return new Filament(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM FILAMENTS');

      return rows.map(row => new Filament(row));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM FILAMENTS WHERE ID=$1', [id]);
  
      if(!rows[0]) throw new Error(`No Filament with id ${id}`);
      return new Filament(rows[0]);
    }

    static async update(id, { filamentName, brand, type, meltingPoint, yearlySales }) {
      const { rows } = await pool.query('UPDATE FILAMENTS SET filament_name=$1, brand=$2, type = $3, melting_point = $4, yearly_sales = $5 WHERE ID = $6 RETURNING *', [filamentName, brand, type, meltingPoint, yearlySales, id]);
      return new Filament(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query('DELETE FROM FILAMENTS WHERE ID = $1 RETURNING *', [id]);
      return new Filament(rows[0]);
    }

};
