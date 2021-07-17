import { makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { IJwtResponse } from "../model/jwt-response.model";
import { IRootState } from "../reducers";
import { getUserById } from "../reducers/auth.reducer";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {

        }
        
    }
    
})

export interface IEmployeePageProp extends StateProps{
    getUserById: any,
    currentUser: IJwtResponse | null
}

function EmployeePage(props: IEmployeePageProp) {
    const classes = useStyles();
    const {user, currentUser} = props;

    useEffect(() => {
        if(currentUser) {
            getUserById(currentUser.id!);
        }
    }, [])
    return (
        <div className={classes.root}>Employee board</div>
    )
}

const mapStateToProps = ({ auth }: IRootState) => ({
    user: auth.user,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        getUserById: (id: number) => dispatch(getUserById(id))
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);