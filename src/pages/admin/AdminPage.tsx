import { makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import AdminDashboard from "../../components/layout/AdminDashboard";
import AdminNavbar from "../../components/layout/AdminNavbar";
import { IJwtResponse } from "../../model/jwt-response.model";
import { IRootState } from "../../reducers";
import { getUserById } from "../../reducers/auth.reducer";

const sidebarWidth = 100;
const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            
        },
        sideAndPages: {
            display: 'flex',

        }
        
    }
    
})

export interface IAdminPageProp extends StateProps{
    getUserById: any,
    currentUser: IJwtResponse | null,
    children: any
}

function AdminPage(props: IAdminPageProp) {
    const classes = useStyles();
    const {user, currentUser} = props;

    useEffect(() => {
        if(currentUser) {
            getUserById(currentUser.id!);
        }
    }, [])
    return (
        <div className={classes.root}>
            <AdminNavbar />
            <div className={classes.sideAndPages}>
                <AdminDashboard />
                <div>{props.children}</div>
            </div>
            
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);