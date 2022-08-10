const FilterPokemon = ({ detailsPokemon }: {detailsPokemon: any}) => {

    return(
        <div key={detailsPokemon.id} className="app__Header-card">
              <div className="app__Header-img">
                <img src={detailsPokemon.sprites.front_default} />
              </div>
              <div className="app__Header-content">
                <tr>
                  <td>name:</td>
                  <td>{detailsPokemon.name}</td>
                </tr>
                <tr>
                  <td>type:</td>
                  <td>{detailsPokemon.types[0].type.name}</td>
                </tr>
                <tr>
                  <td>weight:</td>
                  <td>{detailsPokemon.weight}</td>
                </tr>
              </div>
            </div>
    )
};

export default FilterPokemon;