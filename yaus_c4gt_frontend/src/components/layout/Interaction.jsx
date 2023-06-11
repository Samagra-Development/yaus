import React from "react"
import PropTypes from "prop-types"

const Interaction = ({ icon, alt, count, interact, color }) => (
    <span className="flex w-8">
        <img src={icon}
            alt={alt}
            className="cursor-pointer"
            onClick={interact} />
        <p style={{ color: color }} className="ml-1 font-semibold text-sm">{count}</p>
    </span>
)

Interaction.propTypes = {
    source: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    count: PropTypes.number
}

Interaction.defaultProps = {
    count: "",
    alt: "icon",
}

export default Interaction