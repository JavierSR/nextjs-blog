import { ReactNode } from 'react'
import GeneralInfo from  '../models/generalInfo.model'
import Header from './header/Header'

declare interface WrapperProps {
    children: ReactNode
    generalInfo: GeneralInfo
}

const Wrapper = ({ generalInfo, children } : WrapperProps ) => (
    <>
        <Header generalInfo={generalInfo} />
        {children}
    </>
)

export default Wrapper