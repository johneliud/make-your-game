const maze = [
        "WWWWWWWWWWWWWWWWWWWWWWW",
        "WPPPWPPPPPPPPPPPPPWPPPW",
        "WPWPWPWWWWWPWWWWWPWPWPW", 
        "WPPPPPPPWPPPPPWPPPPPPPW", 
        "WWWPWPWPWPWWWPWPWPWPWWW", 
        "WPPPWPWPWPW WPWPWPWPPPW", 
        "WPWPWPWPWPWWWPWPWPWPWPW", 
        "WPPPWPWPPPPPPPPPWPWPPPW", 
        "WWWWWPWPWWWWWWWPWPWWWWW", 
        "WPPPPPWPPPPPPPPPWPPPPPW", 
        "WPWWWWWPGGGTGGGPWWWWWPW", 
        "OPPPPPPPG     GPPPPPPPO", 
        "WPWWWWWPGGGGGGGPWWWWWPW", 
        "WPPPPPWPPPPPPPPPWPPPPPW", 
        "WWWWWPWPWWWWWWWPWPWWWWW",
        "WPPPWPWPPPPPPPPPWPWPPPW", 
        "WPWPWPWPWPWWWPWPWPWPWPW",
        "WPPPWPWPWPW WPWPWPWPPPW", 
        "WWWPWPWPWPWWWPWPWPWPWWW", 
        "WPPPPPPPWPPPPPWPPPPPPPW", 
        "WPWPWPWWWWWPWWWWWPWPWPW", 
        "WPPPWPPPPPPPPPPPPPWPPPW", 
        "WWWWWWWWWWWWWWWWWWWWWWW",
      ];

      const tileClasses = {
        W: "wall",
        P: "path",
        G: "ghost-pen",
        T: "gate",
        O: "warp"
      };

      const grid = document.querySelector(".grid");
      maze.forEach(row => {
        row.split("").forEach(cell => {
          const div = document.createElement("div");
          div.classList.add("tile", tileClasses[cell]);
          grid.appendChild(div);
        });
      });
