import React from 'react'
import BaseLayout from '../components/layout/BaseLayout'

type NewPageProps = {}

const NewPage: React.FC<NewPageProps> = ({}) => {
    return (
        <BaseLayout>
            <div>new page!</div>
        </BaseLayout>
    )
}

export default NewPage
