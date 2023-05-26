class CELL 
{
    constructor()
    {
        this.STATE = 0;
        this.HAS_NEIGHBOOR = false;
    }

    TOGGLE_CELL_STATE() {
        CELL_STATE_ON_COLOR = "#2b2b2b";
        CELL_STATE_OFF_COLOR = "#ffffff";
        
        if (this.STATE) {
            this.STATE = false; 
            this.COLOR = CELL_STATE_OFF_COLOR;
        } else {
            this.STATE = true;
            this.COLOR = CELL_STATE_ON_COLOR;
        }
    }

    CHECK_STATE()
    {
        return self.STATE;
    }

    CHECK_IF_NEIGHBOOR()
    {
        return self.HAS_NEIGHBOOR;
    }
    
}