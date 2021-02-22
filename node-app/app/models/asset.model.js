module.exports = (sequelize, Sequelize) => {
    const Asset = sequelize.define("asset", {
        supplierId: {
            type: Sequelize.BIGINT
        },
        reviewerId: {
            type: Sequelize.BIGINT
        },
        carrierId: {
            type: Sequelize.BIGINT
        },
        type: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.BIGINT
        },
        timestamp: {
            type: Sequelize.DATE
        },
        note: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        }
    });

    return Asset;
};