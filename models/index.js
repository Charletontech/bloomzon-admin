const Sequelize = require("sequelize");

const dbConfig = {
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MSQL_DATABASE,
  dialect: process.env.MSQL_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models for Bloomzon Elite service - starts
db.EliteVideo = require("./elite/eliteVideo.model.js")(sequelize, Sequelize);
db.EliteVideosAnalyticsData =
  require("./elite/eliteVideosAnalyticsData.model.js")(sequelize, Sequelize);
db.EliteMusic = require("./elite/eliteMusic.model.js")(sequelize, Sequelize);
db.EliteMusicAnalyticsData =
  require("./elite/eliteMusicAnalyticsData.model.js")(sequelize, Sequelize);

db.ElitePodcast = require("./elite/elitePodcast.model.js")(
  sequelize,
  Sequelize
);
db.ElitePodcastEpisode = require("./elite/elitePodcastEpisode.model.js")(
  sequelize,
  Sequelize
);
db.ElitePodcastAnalytics = require("./elite/elitePodcastAnalytics.model.js")(
  sequelize,
  Sequelize
);
db.EliteBook = require("./elite/eliteBook.model.js")(sequelize, Sequelize);

// models for Bloomzon Elite service - stops

// models for Bloomzon Elite Admin service - starts
db.EliteMembership = require("./eliteAdmin/eliteMembershipPlan.model.js")(
  sequelize,
  Sequelize
);
db.Discount = require("./eliteAdmin/Discount.model.js")(sequelize, Sequelize);

// models for Bloomzon Elite Admin service - stops

db.User = require("./user.model.js")(sequelize, Sequelize);
db.Variable = require("./variable.model.js")(sequelize, Sequelize);
db.Role = require("./role.model.js")(sequelize, Sequelize);
db.RolePermission = require("./role.permission.model.js")(sequelize, Sequelize);
db.Referalearning = require("./referal.earning.model.js")(sequelize, Sequelize);
db.Transaction = require("./transaction.model.js")(sequelize, Sequelize);
db.Withdraw = require("./withdraw.model.js")(sequelize, Sequelize);
db.Notification = require("./notification.model.js")(sequelize, Sequelize);
db.DomainEmail = require("./domain.email.model.js")(sequelize, Sequelize);
db.PaymentOption = require("./payment.option.model.js")(sequelize, Sequelize);
db.Plan = require("./plan.model.js")(sequelize, Sequelize);
db.PlanFeature = require("./plan.feature.model.js")(sequelize, Sequelize);
db.UserNoticeSetting = require("./user.notice.setting.model.js")(
  sequelize,
  Sequelize
);

db.Region = require("./region.model.js")(sequelize, Sequelize);
db.Country = require("./country.model.js")(sequelize, Sequelize);
db.State = require("./state.model.js")(sequelize, Sequelize);
db.City = require("./city.model.js")(sequelize, Sequelize);
db.BusinessType = require("./business.type.model.js")(sequelize, Sequelize);
db.Business = require("./business.model.js")(sequelize, Sequelize);
db.ProductsCategory = require("./product.category.model.js")(
  sequelize,
  Sequelize
);
db.ProductsSubCategory = require("./product.subcategory.model.js")(
  sequelize,
  Sequelize
);
db.SellerBusiness = require("./seller.business.model.js")(sequelize, Sequelize);
db.SellerBusinessStore = require("./seller.business.store.model.js")(
  sequelize,
  Sequelize
);
db.SellerBusinessStoreResolution =
  require("./seller.store.resolution.model.js")(sequelize, Sequelize);
db.BStoreOption = require("./business.store.model.js")(sequelize, Sequelize);
db.BPaymentOption = require("./business.payment.option.model.js")(
  sequelize,
  Sequelize
);
db.SellerBusinessShipping = require("./seller.business.shipping.model.js")(
  sequelize,
  Sequelize
);
db.Shipping = require("./shipping.model.js")(sequelize, Sequelize);
db.ShippingSelf = require("./shipping.self.model.js")(sequelize, Sequelize);
db.ShippingPickup = require("./shipping.pickup.model.js")(sequelize, Sequelize);
db.ShippingPickupPackage = require("./shipping.pickup.package.model.js")(
  sequelize,
  Sequelize
);
db.SellerBStoreIssue = require("./seller.store.issue.model.js")(
  sequelize,
  Sequelize
);
db.SellerBStoreIssueChat = require("./seller.store.issue.chat.model.js")(
  sequelize,
  Sequelize
);
db.SellerBStoreIssueMail = require("./seller.store.issue.mail.model.js")(
  sequelize,
  Sequelize
);
db.SellerPlan = require("./seller.plan.model.js")(sequelize, Sequelize);

db.User.hasMany(db.Notification);
db.Notification.belongsTo(db.User);
db.User.hasMany(db.Transaction);
db.Transaction.belongsTo(db.User);
db.User.hasMany(db.Referalearning);
db.Referalearning.belongsTo(db.User);
db.User.hasMany(db.Withdraw);
db.Withdraw.belongsTo(db.User);
db.User.hasMany(db.PaymentOption);
db.PaymentOption.belongsTo(db.User);
db.User.hasMany(db.SellerBusiness);
db.SellerBusiness.belongsTo(db.User);
db.User.hasMany(db.SellerBusinessStore);
db.SellerBusinessStore.belongsTo(db.User);
db.Region.hasMany(db.Country);
db.Country.belongsTo(db.Region);
db.Business.hasMany(db.ProductsCategory);
db.ProductsCategory.belongsTo(db.Business);
db.ProductsCategory.hasMany(db.ProductsSubCategory);
db.ProductsSubCategory.belongsTo(db.ProductsCategory);
db.Plan.hasMany(db.PlanFeature);
db.PlanFeature.belongsTo(db.Plan);
db.Country.hasMany(db.PlanFeature);
db.PlanFeature.belongsTo(db.Country);
db.Country.hasMany(db.SellerBusinessStore);
db.SellerBusinessStore.belongsTo(db.Country);
db.User.hasMany(db.ShippingSelf);
db.ShippingSelf.belongsTo(db.User);
db.Country.hasMany(db.State);
db.State.belongsTo(db.Country);
db.State.hasMany(db.City);
db.City.belongsTo(db.State);
db.Country.hasMany(db.ShippingPickup);
db.ShippingPickup.belongsTo(db.Country);
db.State.hasMany(db.ShippingPickup);
db.ShippingPickup.belongsTo(db.State);
db.City.hasMany(db.ShippingPickup);
db.ShippingPickup.belongsTo(db.City);
db.User.hasMany(db.ShippingPickup);
db.ShippingPickup.belongsTo(db.User);
db.ShippingPickup.hasMany(db.ShippingPickupPackage);
db.ShippingPickupPackage.belongsTo(db.ShippingPickup);
db.User.hasMany(db.ShippingPickupPackage);
db.ShippingPickupPackage.belongsTo(db.User);
db.SellerBusinessStore.hasMany(db.SellerBusinessStoreResolution);
db.SellerBusinessStoreResolution.belongsTo(db.SellerBusinessStore);
db.ProductsCategory.hasMany(db.SellerBusinessStoreResolution);
db.SellerBusinessStoreResolution.belongsTo(db.ProductsCategory);
db.SellerBusinessStore.hasMany(db.SellerBStoreIssue);
db.SellerBStoreIssue.belongsTo(db.SellerBusinessStore);
db.User.hasMany(db.SellerBStoreIssue);
db.SellerBStoreIssue.belongsTo(db.User);
db.SellerBStoreIssue.hasMany(db.SellerBStoreIssueChat);
db.SellerBStoreIssueChat.belongsTo(db.SellerBStoreIssue);
db.User.hasMany(db.SellerBStoreIssueChat);
db.SellerBStoreIssueChat.belongsTo(db.User);
db.SellerBStoreIssue.hasMany(db.SellerBStoreIssueMail);
db.SellerBStoreIssueMail.belongsTo(db.SellerBStoreIssue);
db.User.hasMany(db.SellerBStoreIssueMail);
db.SellerBStoreIssueMail.belongsTo(db.User);
db.User.hasMany(db.UserNoticeSetting);
db.UserNoticeSetting.belongsTo(db.User);

db.PlanFeature.hasOne(db.SellerPlan);
db.SellerPlan.belongsTo(db.PlanFeature);
db.User.hasOne(db.SellerPlan);
db.SellerPlan.belongsTo(db.User);
db.SellerBusiness.hasOne(db.SellerPlan);
db.SellerPlan.belongsTo(db.SellerBusiness);

db.SellerBusiness.belongsToMany(db.PaymentOption, {
  through: db.BPaymentOption,
});
db.PaymentOption.belongsToMany(db.SellerBusiness, {
  through: db.BPaymentOption,
});

db.SellerBusiness.belongsToMany(db.SellerBusinessStore, {
  through: db.BStoreOption,
});
db.SellerBusinessStore.belongsToMany(db.SellerBusiness, {
  through: db.BStoreOption,
});

db.Shipping.belongsToMany(db.SellerBusinessStore, {
  through: db.SellerBusinessShipping,
});
db.SellerBusinessStore.belongsToMany(db.Shipping, {
  through: db.SellerBusinessShipping,
});

db.ShippingSelf.belongsToMany(db.SellerBusinessStore, {
  through: db.SellerBusinessShipping,
});
db.SellerBusinessStore.belongsToMany(db.ShippingSelf, {
  through: db.SellerBusinessShipping,
});

db.ShippingPickup.belongsToMany(db.SellerBusinessStore, {
  through: db.SellerBusinessShipping,
});
db.SellerBusinessStore.belongsToMany(db.ShippingPickup, {
  through: db.SellerBusinessShipping,
});

db.SellerBusiness.belongsTo(db.Country, {
  as: "CountryOfBirth",
  foreignKey: { name: "spiCountryOfBirth" },
});
db.SellerBusiness.belongsTo(db.Country, {
  as: "CountryOfCitizenship",
  foreignKey: { name: "spiCountryOfCitizenship" },
});
db.SellerBusiness.belongsTo(db.Country, {
  as: "CountryOfIssue",
  foreignKey: { name: "ivCountryOfIssue" },
});
db.SellerBusiness.belongsTo(db.Country, {
  as: "Residential",
  foreignKey: { name: "avResidential" },
});

db.SellerBusinessStore.belongsTo(db.ProductsSubCategory, {
  foreignKey: { name: "ProductSubCategoryId" },
});
db.SellerBusinessStore.belongsTo(db.ProductsCategory, {
  foreignKey: { name: "ProductCategoryId" },
});

db.SellerBStoreIssueChat.belongsTo(db.User, {
  foreignKey: { name: "replyBy" },
});
db.SellerBStoreIssueMail.belongsTo(db.User, {
  foreignKey: { name: "replyBy" },
});

module.exports = db;
