use anchor_lang::prelude::*;

declare_id!("2vi5oMpNoo7Qvbjf9sYM3rr4NhZzQnR5ViSsuX1wErG3");

#[program]
pub mod solbrick {
    use super::*;

    // Создать новый объект (строительный проект)
    pub fn create_asset(
        ctx: Context<CreateAsset>,
        name: String,
        total_shares: u64,
        price_per_share: u64,
    ) -> Result<()> {
        let asset = &mut ctx.accounts.asset;
        asset.owner = ctx.accounts.owner.key();
        asset.name = name;
        asset.total_shares = total_shares;
        asset.sold_shares = 0;
        asset.price_per_share = price_per_share;
        asset.is_active = true;
        msg!("Asset created: {}", asset.name);
        Ok(())
    }

    // Купить долю в объекте
    pub fn buy_shares(
        ctx: Context<BuyShares>,
        amount: u64,
    ) -> Result<()> {
        let asset = &mut ctx.accounts.asset;
        let holding = &mut ctx.accounts.holding;

        require!(asset.is_active, SolbrickError::AssetNotActive);
        require!(
            asset.sold_shares + amount <= asset.total_shares,
            SolbrickError::NotEnoughShares
        );

        asset.sold_shares += amount;
        holding.investor = ctx.accounts.investor.key();
        holding.asset = asset.key();
        holding.shares = amount;

        msg!("Bought {} shares", amount);
        Ok(())
    }
}

#[account]
pub struct Asset {
    pub owner: Pubkey,
    pub name: String,
    pub total_shares: u64,
    pub sold_shares: u64,
    pub price_per_share: u64,
    pub is_active: bool,
}

#[account]
pub struct Holding {
    pub investor: Pubkey,
    pub asset: Pubkey,
    pub shares: u64,
}

#[derive(Accounts)]
pub struct CreateAsset<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 64 + 8 + 8 + 8 + 1)]
    pub asset: Account<'info, Asset>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyShares<'info> {
    #[account(mut)]
    pub asset: Account<'info, Asset>,
    #[account(init, payer = investor, space = 8 + 32 + 32 + 8)]
    pub holding: Account<'info, Holding>,
    #[account(mut)]
    pub investor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum SolbrickError {
    #[msg("Asset is not active")]
    AssetNotActive,
    #[msg("Not enough shares available")]
    NotEnoughShares,
}
