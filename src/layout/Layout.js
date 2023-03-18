import React from 'react'
import MenuBar from '../components/navigations/MenuBar'
import Footer from '../components/navigations/Footer'

const Layout = (props) => {
    return(
        <React.Fragment>
            <MenuBar />

            <main>
                {props.children}
            </main>

            <Footer/>
        </React.Fragment>
    );
}

export default Layout;