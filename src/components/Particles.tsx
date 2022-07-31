import { useEffect, useState } from "react";
import React  from "react";
import  { images } from '../utils';

import Particles from "react-tsparticles";

function Particle() {

    


    return (
        <div>
            dpasadasdasd
        <Particles
        className="demo"
        params={{
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 1000
              }
            },
            line_linked: {
              enable: false
            },
            move: {
              speed: 1,
              out_mode: "out"
            },
            color: {
              value: "#000000"
            },
            size: {
              value: 30,
              random: false,
              anim: {
                enable: true,
                speed: 4,
                size_min: 10,
                sync: false
              }
            }
          },
          retina_detect: false
        }}
        />
        </div>
    );
};

export default Particle;