import { useContext } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Context } from '../contexts/deviceContext'

const ScrollerWrapper = ({ children }: any) => {
    const { state } = useContext(Context)

    return state.isDesktop ? 
        <Scrollbars
            universal
            autoHide
        >
            {children}
        </Scrollbars>
        :
        <>
            {children}
        </>
}

export default ScrollerWrapper